import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APICommentsMessage,
  APIDeleteUserRequest,
  APIIP,
  APIUserPreferencesRequest,
  AddToTrafficBlacklistRequest,
  CommentMessageFields,
  CreateContactRequest,
  DeleteContactRequest,
  DeleteFromTrafficBlacklistRequest,
  GetMessagesRequest,
} from '@grpc/spec.pb';
import {CommentsClient, ContactsClient, TrafficClient, UsersClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {ContactsService} from '@services/contacts';
import {IpService} from '@services/ip';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {APIUser, UserService} from '@services/user';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-users-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UsersUserComponent {
  protected readonly banPeriods = [
    {name: $localize`hour`, value: 1},
    {name: $localize`2 hours`, value: 2},
    {name: $localize`4 hours`, value: 4},
    {name: $localize`8 hours`, value: 8},
    {name: $localize`16 hours`, value: 16},
    {name: $localize`day`, value: 24},
    {name: $localize`2 days`, value: 48},
  ];
  protected banPeriod = 1;
  protected banReason: null | string = null;
  protected readonly canDeleteUser$ = this.acl.isAllowed$(Resource.USER, Privilege.DELETE);
  protected readonly canViewIp$ = this.acl.isAllowed$(Resource.USER, Privilege.IP);
  protected readonly canBan$ = this.acl.isAllowed$(Resource.USER, Privilege.BAN);
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly user$: Observable<APIUser> = this.route.paramMap.pipe(
    map((params) => '' + params.get('identity')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((identity) =>
      this.userService.getByIdentity$(identity, {
        fields:
          'identity,gravatar_hash,photo,is_moder,reg_date,last_online,accounts,pictures_added,pictures_accepted_count,last_ip',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    switchMap((user) => {
      if (!user) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 62,
            title: user.name,
          }),
        0,
      );

      return of(user);
    }),
    shareReplay(1),
  );

  protected readonly pictures$: Observable<APIPicture[]> = this.user$.pipe(
    switchMap((user) =>
      this.pictureService
        .getPictures$({
          fields: 'url,name_html',
          limit: 12,
          order: 1,
          owner_id: user.id.toString(),
        })
        .pipe(map((response) => response.pictures)),
    ),
  );

  protected readonly comments$: Observable<APICommentsMessage[]> = this.user$.pipe(
    switchMap((user) => {
      if (user.deleted) {
        return of([]);
      }

      return this.commentsClient
        .getMessages(
          new GetMessagesRequest({
            fields: new CommentMessageFields({
              preview: true,
              route: true,
            }),
            limit: 15,
            order: GetMessagesRequest.Order.DATE_DESC,
            userId: user.id + '',
          }),
        )
        .pipe(map((response) => (response.items ? response.items : [])));
    }),
  );

  private readonly ipChange$ = new BehaviorSubject<void>(void 0);

  protected readonly ip$: Observable<APIIP | null> = combineLatest([this.user$, this.ipChange$]).pipe(
    switchMap(([user]) => {
      if (!user.last_ip) {
        return of(null);
      }

      return this.ipService.getIp$(user.last_ip, ['blacklist', 'rights']).pipe(catchError(() => of(null)));
    }),
  );

  protected readonly currentUser$ = this.auth.getUser$();

  protected readonly isNotMe$ = combineLatest([this.user$, this.currentUser$]).pipe(
    map(([user, currentUser]) => {
      return !currentUser || currentUser.id !== user.id.toString();
    }),
  );

  private readonly inContactsChange$ = new BehaviorSubject<void>(void 0);

  protected readonly inContacts$ = combineLatest([
    this.user$,
    this.currentUser$,
    this.isNotMe$,
    this.inContactsChange$,
  ]).pipe(
    switchMap(([user, currentUser, isNotMe]) => {
      if (!currentUser || !isNotMe) {
        return of(false);
      }

      return this.contacts.isInContacts$(user.id.toString());
    }),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    shareReplay(1),
  );

  private readonly userUserPreferencesChanged$ = new BehaviorSubject<void>(void 0);

  protected readonly userUserPreferences$ = combineLatest([
    this.user$,
    this.currentUser$,
    this.isNotMe$,
    this.userUserPreferencesChanged$,
  ]).pipe(
    switchMap(([user, currentUser, isNotMe]) => {
      if (!currentUser || !isNotMe) {
        return of(false);
      }

      return this.usersGrpc.getUserPreferences(new APIUserPreferencesRequest({userId: user.id.toString()}));
    }),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    shareReplay(1),
  );

  constructor(
    private readonly api: APIService,
    private readonly contacts: ContactsService,
    private readonly messageDialogService: MessageDialogService,
    private readonly acl: ACLService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly ipService: IpService,
    private readonly contactsClient: ContactsClient,
    private readonly usersGrpc: UsersClient,
    private readonly trafficClient: TrafficClient,
    private readonly commentsClient: CommentsClient,
  ) {}

  protected openMessageForm(user: APIUser) {
    this.messageDialogService.showDialog('' + user.id);
    return false;
  }

  protected setInContacts(user: APIUser, value: boolean) {
    if (value) {
      this.contactsClient.createContact(new CreateContactRequest({userId: user.id.toString()})).subscribe(() => {
        this.inContactsChange$.next();
      });
      return;
    }

    this.contactsClient.deleteContact(new DeleteContactRequest({userId: user.id.toString()})).subscribe(() => {
      this.inContactsChange$.next();
    });
  }

  protected setCommentNotificationsDisabled(user: APIUser, value: boolean) {
    if (value) {
      this.usersGrpc
        .disableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id.toString()}))
        .subscribe(() => {
          this.userUserPreferencesChanged$.next();
        });
      return;
    }

    this.usersGrpc
      .enableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id.toString()}))
      .subscribe(() => {
        this.userUserPreferencesChanged$.next();
      });
  }

  protected deletePhoto(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.api.request<void>('DELETE', 'user/' + user.id + '/photo').subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        user.photo = null;
      },
    });
  }

  protected deleteUser(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    this.usersGrpc
      .deleteUser(
        new APIDeleteUserRequest({
          userId: user.id.toString(),
        }),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          user.deleted = true;
        },
      });
  }

  protected removeFromBlacklist(ip: string) {
    this.trafficClient.deleteFromBlacklist(new DeleteFromTrafficBlacklistRequest({ip})).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.ipChange$.next();
      },
    });
  }

  protected addToBlacklist(ip: string) {
    this.trafficClient
      .addToBlacklist(
        new AddToTrafficBlacklistRequest({
          ip,
          period: this.banPeriod,
          reason: this.banReason ? this.banReason : '',
        }),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.ipChange$.next();
        },
      });
  }
}
