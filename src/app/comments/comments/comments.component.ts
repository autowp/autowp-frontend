import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';
import {CommentsType, CommentsViewRequest, GetMessagePageRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  private readonly reload$ = new BehaviorSubject<null>(null);

  @Input() set itemID(itemID: number) {
    this.itemID$.next(itemID);
  }
  protected readonly itemID$ = new BehaviorSubject<number>(null);

  @Input() set typeID(typeID: CommentsType) {
    this.typeID$.next(typeID);
  }
  protected readonly typeID$ = new BehaviorSubject<CommentsType>(null);

  @Input() set limit(limit: number) {
    this.limit$.next(limit);
  }
  protected readonly limit$ = new BehaviorSubject<number>(null);

  @Input() set page(page: number) {
    this.page$.next(page);
  }
  protected readonly page$ = new BehaviorSubject<number>(null);

  protected readonly user$ = this.auth.getUser$();

  protected readonly data$ = combineLatest([
    this.user$,
    this.itemID$.pipe(debounceTime(10), distinctUntilChanged()),
    this.typeID$.pipe(debounceTime(10), distinctUntilChanged()),
    this.limit$.pipe(debounceTime(10), distinctUntilChanged()),
    this.page$.pipe(debounceTime(10), distinctUntilChanged()),
    this.reload$,
  ]).pipe(
    switchMap(([user, itemID, typeID, limit, page]) =>
      this.load$(itemID, typeID, limit, page).pipe(
        tap(() => {
          if (user) {
            this.commentsGrpc
              .view(
                new CommentsViewRequest({
                  itemId: '' + itemID,
                  typeId: typeID,
                })
              )
              .subscribe();
          }
        }),
        map((response) => ({
          messages: response.items,
          paginator: response.paginator,
        }))
      )
    )
  );

  constructor(
    private readonly router: Router,
    private readonly commentService: APICommentsService,
    protected readonly auth: AuthService,
    private readonly toastService: ToastsService,
    private readonly commentsGrpc: CommentsClient
  ) {}

  protected onSent(id: string) {
    this.limit$
      .pipe(
        take(1),
        switchMap((limit) => {
          if (!limit) {
            this.reload$.next(null);
            return EMPTY;
          }

          return this.commentsGrpc.getMessagePage(new GetMessagePageRequest({messageId: id, perPage: limit})).pipe(
            catchError((error: unknown) => {
              this.toastService.handleError(error);
              return EMPTY;
            }),
            switchMap((response) =>
              this.page$.pipe(
                take(1),
                tap((page) => {
                  if (page !== response.page) {
                    this.router.navigate([], {
                      queryParams: {page: response.page},
                      queryParamsHandling: 'merge',
                    });
                  } else {
                    this.reload$.next(null);
                  }
                })
              )
            )
          );
        })
      )
      .subscribe();
  }

  protected load$(itemID: number, typeID: number, limit: number, page: number): Observable<APICommentGetResponse> {
    if (!typeID || !itemID) {
      return EMPTY;
    }

    return this.commentService.getComments$({
      type_id: typeID,
      item_id: itemID,
      no_parents: true,
      fields: ['user.avatar', 'user.gravatar', 'replies', 'text', 'vote', 'user_vote'],
      order: 'date_asc',
      limit: limit ? limit : null,
      page: page,
    });
  }
}
