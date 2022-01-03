import {Component} from '@angular/core';
import {ContactsService} from '../../services/contacts';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIUser, UserService} from '../../services/user';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {APIPicture, PictureService} from '../../services/picture';
import {IpService} from '../../services/ip';
import {PageEnvService} from '../../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '../../services/api.service';
import {APIDeleteUserRequest, APIIP, CreateContactRequest, DeleteContactRequest} from '../../../../generated/spec.pb';
import {ContactsClient, UsersClient} from '../../../../generated/spec.pbsc';

@Component({
  selector: 'app-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UsersUserComponent {
  public banPeriods = [
    { value: 1, name: $localize `hour` },
    { value: 2, name: $localize `2 hours` },
    { value: 4, name: $localize `4 hours` },
    { value: 8, name: $localize `8 hours` },
    { value: 16, name: $localize `16 hours` },
    { value: 24, name: $localize `day` },
    { value: 48, name: $localize `2 days` }
  ];
  public banPeriod = 1;
  public banReason: string | null = null;
  public canDeleteUser$ = this.acl.isAllowed(Resource.USER, Privilege.DELETE);
  public canBeInContacts = false;
  public canViewIp$ = this.acl.isAllowed(Resource.USER, Privilege.IP);
  public canBan$ = this.acl.isAllowed(Resource.USER, Privilege.BAN);
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  public user$ = this.route.paramMap.pipe(
    map(params => ''+params.get('identity')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap(identity => this.userService.getByIdentity(identity, { fields: 'identity,gravatar_hash,photo,renames,is_moder,reg_date,last_online,accounts,pictures_added,pictures_accepted_count,last_ip' })),
    catchError(err => {
      this.toastService.response(err);
      return EMPTY;
    }),
    switchMap(user => {
      if (!user) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }

      setTimeout(
        () =>
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: user.name,
            pageId: 62
          }),
        0
      );

      return of(user);
    }),
    shareReplay(1)
  );

  public pictures$: Observable<APIPicture[]> = this.user$.pipe(
    switchMap(user => this.pictureService.getPictures({
      owner_id: user.id,
      limit: 12,
      order: 1,
      fields: 'url,name_html'
    }).pipe(
      map(response => response.pictures)
    ))
  );

  public comments$ = this.user$.pipe(
    switchMap(user => {
      if (user.deleted) {
        return of({items: []} as APICommentGetResponse);
      }

      return this.commentService.getComments({
        user_id: user.id,
        limit: 15,
        order: 'date_desc',
        fields: ['preview', 'route']
      });
    }),
    map(response => response.items)
  );

  private ipChange$ = new BehaviorSubject<boolean>(true);

  public ip$ = combineLatest([this.user$, this.ipChange$]).pipe(
    switchMap(([user]) => {
      if (!user.last_ip) {
        return of(null as APIIP);
      }

      return this.ipService.getIp(user.last_ip, ['blacklist', 'rights']);
    }),
    catchError(() => of(null as APIIP)),
  );

  public currentUser$ = this.auth.getUser();

  public isMe$ = combineLatest([this.user$, this.currentUser$]).pipe(
    map(([user, currentUser]) => {
      return currentUser && currentUser.id === user.id;
    })
  );

  private inContactsChange$ = new BehaviorSubject<boolean>(true);

  public inContacts$ = combineLatest([this.user$, this.currentUser$, this.isMe$, this.inContactsChange$]).pipe(
    switchMap(([user, currentUser, isMe]) => {
      if (!currentUser || isMe) {
        return of(false);
      }

      return this.contacts.isInContacts(user.id.toString());
    }),
    catchError(response => {
      this.toastService.response(response)
      return EMPTY;
    }),
    shareReplay(1)
  );

  constructor(
    private api: APIService,
    private contacts: ContactsService,
    private messageDialogService: MessageDialogService,
    private acl: ACLService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private pictureService: PictureService,
    private commentService: APICommentsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private ipService: IpService,
    private contactsClient: ContactsClient,
    private usersGrpc: UsersClient
  ) {}

  public openMessageForm(user: APIUser) {
    this.messageDialogService.showDialog(user.id);
    return false;
  }

  public setInContacts(user: APIUser, value: boolean) {
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

  public deletePhoto(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.api.request<void>('DELETE', 'user/' + user.id + '/photo').subscribe(
      () => {
        user.photo = null;
      },
      response => this.toastService.response(response)
    );
  }

  public deleteUser(user: APIUser) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    this.usersGrpc.deleteUser(new APIDeleteUserRequest({
      userId: user.id.toString()
    })).subscribe(
      () => {
        user.deleted = true;
      },
      response => this.toastService.grpcErrorResponse(response)
    );
  }

  public removeFromBlacklist(ipAddress: string) {
    this.api
      .request<void>('DELETE', 'traffic/blacklist/' + ipAddress)
      .subscribe(
        () => {
          this.ipChange$.next(true);
        },
        response => this.toastService.response(response)
      );
  }

  public addToBlacklist(ipAddress: string) {
    this.api.request<void>('POST', 'traffic/blacklist', {body: {
      ip: ipAddress,
      period: this.banPeriod,
      reason: this.banReason
    }})
    .pipe(
      catchError(err => {
        this.toastService.response(err);
        return EMPTY;
      }),
    )
    .subscribe(() => {
      this.ipChange$.next(true);
    });
  }
}
