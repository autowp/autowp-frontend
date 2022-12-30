import {Component} from '@angular/core';
import {UserService} from '../../../services/user';
import {Router, ActivatedRoute} from '@angular/router';
import {combineLatest, EMPTY} from 'rxjs';
import {PageEnvService} from '../../../services/page-env.service';
import {switchMap, distinctUntilChanged, debounceTime, catchError, tap, map, shareReplay} from 'rxjs/operators';
import {APICommentsService} from '../../../api/comments/comments.service';
import {ToastsService} from '../../../toasts/toasts.service';

interface Order {
  name: string;
  value: string;
}

@Component({
  selector: 'app-users-user-comments',
  templateUrl: './comments.component.html',
})
export class UsersUserCommentsComponent {
  private page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public order$ = this.route.queryParamMap
    .pipe(
      map((params) => params.get('order')),
      distinctUntilChanged(),
      debounceTime(10)
    )
    .pipe(
      map((order) => order || 'date_desc'),
      shareReplay(1)
    );

  public user$ = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity(identity, {fields: 'identity'})),
    catchError((err) => {
      this.toastService.response(err);
      return EMPTY;
    }),
    tap((user) => {
      if (!user) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return;
      }
    }),
    shareReplay(1)
  );

  public comments$ = combineLatest([this.user$, this.page$, this.order$]).pipe(
    tap(() => {
      setTimeout(() => this.pageEnv.set({pageId: 205}), 0);
    }),
    switchMap(([user, page, order]) =>
      this.commentService.getComments({
        user_id: user.id,
        page: page,
        limit: 30,
        order: order,
        fields: ['preview', 'route', 'vote'],
      })
    ),
    catchError((err) => {
      this.toastService.response(err);
      return EMPTY;
    })
  );

  public orders: Order[] = [
    {value: 'date_desc', name: $localize`New`},
    {value: 'date_asc', name: $localize`Old`},
    {value: 'vote_desc', name: $localize`Positive`},
    {value: 'vote_asc', name: $localize`Negative`},
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: APICommentsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
