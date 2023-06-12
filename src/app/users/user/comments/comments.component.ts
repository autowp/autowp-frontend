import {Component} from '@angular/core';
import {UserService} from '@services/user';
import {Router, ActivatedRoute} from '@angular/router';
import {combineLatest, EMPTY} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, distinctUntilChanged, debounceTime, catchError, tap, map, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../../../toasts/toasts.service';
import {CommentsClient} from '@grpc/spec.pbsc';
import {CommentMessageFields, GetMessagesRequest} from '@grpc/spec.pb';

interface Order {
  name: string;
  value: string;
  apiValue: GetMessagesRequest.Order;
}

@Component({
  selector: 'app-users-user-comments',
  templateUrl: './comments.component.html',
})
export class UsersUserCommentsComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly order$ = this.route.queryParamMap
    .pipe(
      map((params) => params.get('order')),
      distinctUntilChanged(),
      debounceTime(10)
    )
    .pipe(
      map((order) => order || 'date_desc'),
      shareReplay(1)
    );

  protected readonly user$ = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity$(identity, {fields: 'identity'})),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
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

  protected readonly comments$ = combineLatest([this.user$, this.page$, this.order$]).pipe(
    tap(() => {
      setTimeout(() => this.pageEnv.set({pageId: 205}), 0);
    }),
    switchMap(([user, page, order]) =>
      this.commentsClient.getMessages(
        new GetMessagesRequest({
          userId: user.id + '',
          page: page,
          limit: 30,
          order: this.getOrderApiValue(order),
          fields: new CommentMessageFields({
            preview: true,
            route: true,
            vote: true,
          }),
        })
      )
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    })
  );

  protected readonly orders: Order[] = [
    {value: 'date_desc', name: $localize`New`, apiValue: GetMessagesRequest.Order.DATE_DESC},
    {value: 'date_asc', name: $localize`Old`, apiValue: GetMessagesRequest.Order.DATE_ASC},
    {value: 'vote_desc', name: $localize`Positive`, apiValue: GetMessagesRequest.Order.VOTE_DESC},
    {value: 'vote_asc', name: $localize`Negative`, apiValue: GetMessagesRequest.Order.VOTE_ASC},
  ];

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly commentsClient: CommentsClient
  ) {}

  protected getOrderApiValue(order: string): GetMessagesRequest.Order {
    const o = this.orders.find((o) => o.value === order);
    return o ? o.apiValue : null;
  }
}
