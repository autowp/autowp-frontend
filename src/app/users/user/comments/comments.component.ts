import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../../services/api.service';
import { UserService, APIUser } from '../../../services/user';
import { Router, ActivatedRoute} from '@angular/router';
import {Subscription, combineLatest, EMPTY} from 'rxjs';
import { PageEnvService } from '../../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  debounceTime,
  catchError,
  tap, map
} from 'rxjs/operators';
import { APIComment, APICommentsService } from '../../../api/comments/comments.service';
import {ToastsService} from '../../../toasts/toasts.service';

interface Order {
  name: string;
  value: string;
}

@Component({
  selector: 'app-users-user-comments',
  templateUrl: './comments.component.html'
})
export class UsersUserCommentsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public loading = 0;
  public user: APIUser;
  public paginator: APIPaginator;
  public comments: APIComment[];
  public orders: Order[] = [
    { value: 'date_desc', name: $localize `New` },
    { value: 'date_asc', name: $localize `Old` },
    { value: 'vote_desc', name: $localize `Positive` },
    { value: 'vote_asc', name: $localize `Negative` }
  ];
  public order: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: APICommentsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.querySub = combineLatest([
      this.route.paramMap.pipe(
        map(params => params.get('identity')),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(identity => {
          return this.userService.getByIdentity(identity, {fields: 'identity'}).pipe(
            catchError((err) => {
              this.toastService.response(err);
              return EMPTY;
            })
          );
        }),
        tap(user => {
          if (!user) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return;
          }

          setTimeout(
            () =>
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                nameTranslated: $localize `Comments`,
                pageId: 205
              }),
            0
          );

          this.user = user;
        })
      ),
      this.route.queryParamMap.pipe(
        map(params => ({
          order: params.get('order'),
          page: parseInt(params.get('page'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30)
      )
    ])
      .pipe(
        switchMap(([user, query]) => {
          this.order = query.order || 'date_desc';

          return this.commentService
            .getComments({
              user_id: user.id,
              page: query.page,
              limit: 30,
              order: this.order,
              fields: ['preview', 'route', 'vote']
            })
            .pipe(
              catchError((err) => {
                this.toastService.response(err);
                return EMPTY;
              }),
              tap(response => {
                this.comments = response.items;
                this.paginator = response.paginator;
              })
            );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
