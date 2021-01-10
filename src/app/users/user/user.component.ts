import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from '../../services/contacts';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APIUser, UserService} from '../../services/user';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {APIPicture, PictureService} from '../../services/picture';
import {APIIP, IpService} from '../../services/ip';
import {PageEnvService} from '../../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {MessageDialogService} from '../../message-dialog/message-dialog.service';
import {APIComment, APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-users-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
@Injectable()
export class UsersUserComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public user: APIUser;
  public banPeriods = [
    { value: 1, name: 'ban/period/hour' },
    { value: 2, name: 'ban/period/2-hours' },
    { value: 4, name: 'ban/period/4-hours' },
    { value: 8, name: 'ban/period/8-hours' },
    { value: 16, name: 'ban/period/16-hours' },
    { value: 24, name: 'ban/period/day' },
    { value: 48, name: 'ban/period/2-days' }
  ];
  public banPeriod = 1;
  public banReason: string | null = null;
  public ip: APIIP;
  public inContacts = false;
  public comments: APIComment[];
  public pictures: APIPicture[];
  public canDeleteUser = false;
  public isMe = false;
  public canBeInContacts = false;
  public canViewIp = false;
  public canBan = false;
  public isModer = false;
  private aclSub: Subscription;

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
    private ipService: IpService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .isAllowed(Resource.GLOBAL, Privilege.MODERATE)
      .subscribe(isModer => (this.isModer = isModer));

    const fields =
      'identity,gravatar_hash,photo,renames,is_moder,reg_date,last_online,accounts,pictures_added,pictures_accepted_count,last_ip';

    this.routeSub = this.auth
      .getUser()
      .pipe(
        switchMap(currentUser => this.route.paramMap.pipe(
          map(params => ({
            currentUser,
            identity: params.get('identity')
          }))
        )),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(data => combineLatest([
          this.userService
            .getByIdentity(data.identity, { fields })
            .pipe(
              catchError(err => {
                this.toastService.response(err);
                return EMPTY;
              })
            ),
          this.acl.isAllowed(Resource.USER, Privilege.IP),
          this.acl.isAllowed(Resource.USER, Privilege.BAN),
          this.acl.isAllowed(Resource.USER, Privilege.DELETE),
          of(data.currentUser)
        ])),
        switchMap(([user, canViewIp, canBan, canDeleteUser, currentUser]) => {
          if (!user) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }

          this.canViewIp = canViewIp;
          this.canBan = canBan;
          this.canDeleteUser = canDeleteUser;

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

          this.user = user;
          this.isMe = currentUser && currentUser.id === user.id;
          this.canBeInContacts = currentUser && !user.deleted && !this.isMe;

          if (currentUser && !this.isMe) {
            this.contacts
              .isInContacts(user.id)
              .subscribe(
                inContacts => (this.inContacts = inContacts),
                response => this.toastService.response(response)
              );
          }

          const pictures = this.pictureService.getPictures({
            owner_id: user.id,
            limit: 12,
            order: 1,
            fields: 'url,name_html'
          }).pipe(
            catchError(() => of(null))
          );

          let comments = of(null as APICommentGetResponse);
          if (!user.deleted) {
            comments = this.commentService.getComments({
              user_id: user.id,
              limit: 15,
              order: 'date_desc',
              fields: ['preview', 'route']
            });
          }

          let ip = of(null as APIIP);
          if (user.last_ip) {
            ip = this.ipService.getIp(user.last_ip, 'blacklist,rights').pipe(
              catchError(() => of(null as APIIP))
            );
          }

          return combineLatest([pictures, comments, ip]).pipe(
            tap(([picturesResponse, commentsResponse, ipResponse]) => {
              this.pictures = picturesResponse ? picturesResponse.pictures : [];
              this.comments = commentsResponse.items;
              this.ip = ipResponse;
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.aclSub.unsubscribe();
  }

  public openMessageForm() {
    this.messageDialogService.showDialog(this.user.id);
    return false;
  }

  public toggleInContacts() {
    this.api
      .request<void>(
        this.inContacts ? 'DELETE' : 'PUT',
        'contacts/' + this.user.id,
        {
          observe: 'response'
        }
      )
      .subscribe(
        response => {
          switch (response.status) {
            case 204:
              this.inContacts = false;
              break;
            case 201:
              this.inContacts = true;
              break;
          }
        },
        response => this.toastService.response(response)
      );
  }

  public deletePhoto() {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.api.request<void>('DELETE', 'user/' + this.user.id + '/photo').subscribe(
      () => {
        this.user.photo = null;
      },
      response => this.toastService.response(response)
    );
  }

  public deleteUser() {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    this.api
      .request<void>('PUT', 'user/' + this.user.id, {body: {
        deleted: true
      }})
      .subscribe(
        () => {
          this.user.deleted = true;
        },
        response => this.toastService.response(response)
      );
  }

  public unban() {
    this.api
      .request<void>('DELETE', 'traffic/blacklist/' + this.ip.address)
      .subscribe(
        () => {},
        response => this.toastService.response(response)
      );
  }

  public removeFromBlacklist() {
    this.api
      .request<void>('DELETE', 'traffic/blacklist/' + this.ip.address)
      .subscribe(
        () => {
          this.ip.blacklist = null;
        },
        response => this.toastService.response(response)
      );
  }

  public addToBlacklist(ipAddress: string) {
    this.api
      .request<void>('POST', 'traffic/blacklist', {body: {
        ip: ipAddress,
        period: this.banPeriod,
        reason: this.banReason
      }})
      .pipe(
        catchError(err => {
          this.toastService.response(err);
          return EMPTY;
        }),
        switchMap(() => this.ipService.getIp(this.user.last_ip, 'blacklist,rights')),
        catchError(err => {
          this.toastService.response(err);
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.ip = data;
      });
  }
}
