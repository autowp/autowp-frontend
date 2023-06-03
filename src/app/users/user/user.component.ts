import {Component} from '@angular/core';
import {ContactsService} from '@services/contacts';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIUser, UserService} from '@services/user';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {AuthService} from '@services/auth.service';
import {APIPicture, PictureService} from '@services/picture';
import {IpService} from '@services/ip';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {
  AddToTrafficBlacklistRequest,
  APIDeleteUserRequest,
  APIIP,
  APIUserPreferencesRequest,
  CreateContactRequest,
  DeleteContactRequest,
  DeleteFromTrafficBlacklistRequest,
} from '@grpc/spec.pb';
import {ContactsClient, TrafficClient, UsersClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UsersUserComponent {
  protected readonly banPeriods = [
    {value: 1, name: $localize`hour`},
    {value: 2, name: $localize`2 hours`},
    {value: 4, name: $localize`4 hours`},
    {value: 8, name: $localize`8 hours`},
    {value: 16, name: $localize`16 hours`},
    {value: 24, name: $localize`day`},
    {value: 48, name: $localize`2 days`},
  ];
  protected banPeriod = 1;
  protected banReason: string | null = null;
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
      })
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
            title: user.name,
            pageId: 62,
          }),
        0
      );

      return of(user);
    }),
    shareReplay(1)
  );

  protected readonly pictures$: Observable<APIPicture[]> = this.user$.pipe(
    switchMap((user) =>
      this.pictureService
        .getPictures$({
          owner_id: user.id.toString(),
          limit: 12,
          order: 1,
          fields: 'url,name_html',
        })
        .pipe(map((response) => response.pictures))
    )
  );

  protected readonly comments$ = this.user$.pipe(
    switchMap((user) => {
      if (user.deleted) {
        return of({items: []} as APICommentGetResponse);
      }

      return this.commentService.getComments$({
        user_id: user.id,
        limit: 15,
        order: 'date_desc',
        fields: ['preview', 'route'],
      });
    }),
    map((response) => response.items)
  );

  private readonly ipChange$ = new BehaviorSubject<boolean>(true);

  protected readonly ip$ = combineLatest([this.user$, this.ipChange$]).pipe(
    switchMap(([user]) => {
      if (!user.last_ip) {
        return of(null as APIIP);
      }

      return this.ipService.getIp$(user.last_ip, ['blacklist', 'rights']).pipe(catchError(() => of(null as APIIP)));
    })
  );

  protected readonly currentUser$ = this.auth.getUser$();

  protected readonly isNotMe$ = combineLatest([this.user$, this.currentUser$]).pipe(
    map(([user, currentUser]) => {
      return !currentUser || currentUser.id !== user.id.toString();
    })
  );

  private readonly inContactsChange$ = new BehaviorSubject<boolean>(true);

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
    shareReplay(1)
  );

  private readonly userUserPreferencesChanged$ = new BehaviorSubject<boolean>(true);

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
    shareReplay(1)
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
    private readonly commentService: APICommentsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly ipService: IpService,
    private readonly contactsClient: ContactsClient,
    private readonly usersGrpc: UsersClient,
    private readonly trafficClient: TrafficClient
  ) {}

  protected openMessageForm(user: APIUser) {
    this.messageDialogService.showDialog('' + user.id);
    return false;
  }

  protected setInContacts(user: APIUser, value: boolean) {
    if (value) {
      this.contactsClient.createContact(new CreateContactRequest({userId: user.id.toString()})).subscribe(() => {
        this.inContactsChange$.next(true);
      });
      return;
    }

    this.contactsClient.deleteContact(new DeleteContactRequest({userId: user.id.toString()})).subscribe(() => {
      this.inContactsChange$.next(true);
    });
  }

  protected setCommentNotificationsDisabled(user: APIUser, value: boolean) {
    if (value) {
      this.usersGrpc
        .disableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id.toString()}))
        .subscribe(() => {
          this.userUserPreferencesChanged$.next(true);
        });
      return;
    }

    this.usersGrpc
      .enableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id.toString()}))
      .subscribe(() => {
        this.userUserPreferencesChanged$.next(true);
      });
  }

  protected deletePhoto(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.api.request<void>('DELETE', 'user/' + user.id + '/photo').subscribe({
      next: () => {
        user.photo = null;
      },
      error: (response: unknown) => this.toastService.handleError(response),
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
        })
      )
      .subscribe({
        next: () => {
          user.deleted = true;
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected removeFromBlacklist(ip: string) {
    this.trafficClient.deleteFromBlacklist(new DeleteFromTrafficBlacklistRequest({ip})).subscribe({
      next: () => {
        this.ipChange$.next(true);
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  protected addToBlacklist(ip: string) {
    this.trafficClient
      .addToBlacklist(
        new AddToTrafficBlacklistRequest({
          ip,
          period: this.banPeriod,
          reason: this.banReason,
        })
      )
      .subscribe({
        next: () => {
          this.ipChange$.next(true);
        },
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }
}
