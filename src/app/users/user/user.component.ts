import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from '../../services/contacts';
import { ACLService } from '../../services/acl.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, APIUser } from '../../services/user';
import {
  Subscription,
  of,
  forkJoin,
  Observable,
  combineLatest, EMPTY
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PictureService, APIPicture } from '../../services/picture';
import { APIIP } from '../../services/ip';
import { PageEnvService } from '../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  switchMap,
  map
} from 'rxjs/operators';
import { MessageDialogService } from '../../message-dialog/message-dialog.service';
import {APIComment, APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

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
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    const fields =
      'identity,gravatar_hash,photo,renames,is_moder,reg_date,last_online,accounts,pictures_added,pictures_accepted_count,last_ip';

    this.routeSub = this.auth
      .getUser()
      .pipe(
        switchMap(currentUser => this.route.params.pipe(
          map(params => ({
            currentUser,
            params
          }))
        )),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(data => combineLatest([
          this.userService
            .getByIdentity(data.params.identity, { fields })
            .pipe(
              catchError(err => {
                this.toastService.response(err);
                return EMPTY;
              })
            ),
          this.acl.isAllowed('user', 'ip'),
          this.acl.isAllowed('user', 'ban'),
          this.acl.isAllowed('user', 'delete'),
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
          });

          let comments = of(null as APICommentGetResponse);
          if (!user.deleted) {
            comments = this.commentService.getComments({
              user_id: user.id,
              limit: 15,
              order: 'date_desc',
              fields: 'preview,route'
            });
          }

          let ip = of(null as APIIP);
          if (user.last_ip) {
            ip = this.loadBan(user.last_ip);
          }

          return forkJoin([pictures, comments, ip]).pipe(
            tap(([picturesResponse, commentsResponse, ipResponse]) => {
              this.pictures = picturesResponse.pictures;
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

  private loadBan(ip: string): Observable<APIIP> {
    return this.api.request<APIIP>('GET', 'ip/' + ip, {
      params: {
        fields: 'blacklist,rights'
      }
    });
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
            case 200:
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
        switchMap(() => this.loadBan(this.user.last_ip)),
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
