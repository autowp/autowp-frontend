import {AsyncPipe, DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  AddToTrafficBlacklistRequest,
  APICommentsMessage,
  APIDeleteUserRequest,
  APIIP,
  APIUser,
  APIUserPreferencesRequest,
  CommentMessageFields,
  CreateContactRequest,
  DeleteContactRequest,
  DeleteFromTrafficBlacklistRequest,
  DeleteUserPhotoRequest,
  GetMessagesRequest,
  Picture,
  PictureFields,
  PictureListOptions,
  PicturesRequest,
  UserFields,
} from '@grpc/spec.pb';
import {CommentsClient, ContactsClient, PicturesClient, TrafficClient, UsersClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {AuthService, Role} from '@services/auth.service';
import {ContactsService} from '@services/contacts';
import {IpService} from '@services/ip';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgbTooltip, UserComponent, FormsModule, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-users-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UsersUserComponent {
  readonly #contacts = inject(ContactsService);
  readonly #messageDialogService = inject(MessageDialogService);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  readonly #route = inject(ActivatedRoute);
  readonly #auth = inject(AuthService);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #ipService = inject(IpService);
  readonly #contactsClient = inject(ContactsClient);
  readonly #usersGrpc = inject(UsersClient);
  readonly #trafficClient = inject(TrafficClient);
  readonly #commentsClient = inject(CommentsClient);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

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
  protected readonly canDeleteUser$ = this.#auth.hasRole$(Role.ADMIN);
  protected readonly canViewIp$ = this.#auth.hasRole$(Role.MODER);
  protected readonly canBan$ = this.#auth.hasRole$(Role.USERS_MODER);
  protected readonly isModer$ = this.#auth.hasRole$(Role.MODER);

  protected readonly user$: Observable<APIUser> = this.#route.paramMap.pipe(
    map((params) => '' + params.get('identity')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((identity) =>
      this.#userService.getByIdentity$(
        identity,
        new UserFields({
          gravatarLarge: true,
          lastIp: true,
          lastOnline: true,
          photo: true,
          picturesAcceptedCount: true,
          picturesAdded: true,
          regDate: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return EMPTY;
    }),
    switchMap((user) => {
      if (!user) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      setTimeout(
        () =>
          this.#pageEnv.set({
            pageId: 62,
            title: user.name,
          }),
        0,
      );

      return of(user);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$: Observable<Picture[]> = this.user$.pipe(
    switchMap((user) =>
      this.#picturesClient.getPictures(
        new PicturesRequest({
          fields: new PictureFields({nameHtml: true}),
          language: this.#languageService.language,
          limit: 12,
          options: new PictureListOptions({ownerId: user.id}),
          order: PicturesRequest.Order.ORDER_ADD_DATE_DESC,
          paginator: false,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => response.items || []),
  );

  protected readonly comments$: Observable<APICommentsMessage[]> = this.user$.pipe(
    switchMap((user) => {
      if (user.deleted) {
        return of([]);
      }

      return this.#commentsClient
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

  readonly #ipChange$ = new BehaviorSubject<void>(void 0);

  protected readonly ip$: Observable<APIIP | null> = combineLatest([this.user$, this.#ipChange$]).pipe(
    switchMap(([user]) => {
      if (!user.lastIp) {
        return of(null);
      }

      return this.#ipService.getIp$(user.lastIp, ['blacklist', 'rights']).pipe(catchError(() => of(null)));
    }),
  );

  protected readonly authenticated$ = this.#auth.authenticated$;

  protected readonly isNotMe$ = combineLatest([this.user$, this.#auth.user$]).pipe(
    map(([user, currentUser]) => {
      return !currentUser || currentUser.id !== user.id;
    }),
  );

  readonly #inContactsChange$ = new BehaviorSubject<void>(void 0);

  protected readonly inContacts$ = combineLatest([
    this.user$,
    this.#auth.authenticated$,
    this.isNotMe$,
    this.#inContactsChange$,
  ]).pipe(
    switchMap(([user, authenticated, isNotMe]) => {
      if (!authenticated || !isNotMe) {
        return of(false);
      }

      return this.#contacts.isInContacts$(user.id);
    }),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  readonly #userUserPreferencesChanged$ = new BehaviorSubject<void>(void 0);

  protected readonly disableCommentsNotifications$ = combineLatest([
    this.user$,
    this.authenticated$,
    this.isNotMe$,
    this.#userUserPreferencesChanged$,
  ]).pipe(
    switchMap(([user, authenticated, isNotMe]) => {
      if (!authenticated || !isNotMe) {
        return of(false);
      }

      return this.#usersGrpc
        .getUserPreferences(new APIUserPreferencesRequest({userId: user.id}))
        .pipe(map(({disableCommentsNotifications}) => disableCommentsNotifications));
    }),
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected openMessageForm(user: APIUser) {
    this.#messageDialogService.showDialog('' + user.id);
    return false;
  }

  protected setInContacts(user: APIUser, value: boolean) {
    if (value) {
      this.#contactsClient.createContact(new CreateContactRequest({userId: user.id})).subscribe(() => {
        this.#inContactsChange$.next();
      });
      return;
    }

    this.#contactsClient.deleteContact(new DeleteContactRequest({userId: user.id})).subscribe(() => {
      this.#inContactsChange$.next();
    });
  }

  protected setCommentNotificationsDisabled(user: APIUser, value: boolean) {
    if (value) {
      this.#usersGrpc
        .disableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id}))
        .subscribe(() => {
          this.#userUserPreferencesChanged$.next();
        });
      return;
    }

    this.#usersGrpc.enableUserCommentsNotifications(new APIUserPreferencesRequest({userId: user.id})).subscribe(() => {
      this.#userUserPreferencesChanged$.next();
    });
  }

  protected deletePhoto(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.#usersGrpc.deleteUserPhoto(new DeleteUserPhotoRequest({id: user.id})).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: () => {
        user.photo = undefined;
      },
    });
  }

  protected deleteUser(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    this.#usersGrpc
      .deleteUser(
        new APIDeleteUserRequest({
          userId: user.id,
        }),
      )
      .subscribe({
        error: (response: unknown) => this.#toastService.handleError(response),
        next: () => {
          user.deleted = true;
        },
      });
  }

  protected removeFromBlacklist(ip: string) {
    this.#trafficClient.deleteFromBlacklist(new DeleteFromTrafficBlacklistRequest({ip})).subscribe({
      error: (response: unknown) => this.#toastService.handleError(response),
      next: () => {
        this.#ipChange$.next();
      },
    });
  }

  protected addToBlacklist(ip: string) {
    this.#trafficClient
      .addToBlacklist(
        new AddToTrafficBlacklistRequest({
          ip,
          period: this.banPeriod,
          reason: this.banReason ? this.banReason : '',
        }),
      )
      .subscribe({
        error: (response: unknown) => this.#toastService.handleError(response),
        next: () => {
          this.#ipChange$.next();
        },
      });
  }
}
