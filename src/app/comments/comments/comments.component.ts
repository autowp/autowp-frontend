import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {APICommentGetResponse, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';
import {CommentsType, CommentsViewRequest} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  private reload$ = new BehaviorSubject<null>(null);

  @Input() set itemID(itemID: number) {
    this.itemID$.next(itemID);
  }
  public itemID$ = new BehaviorSubject<number>(null);

  @Input() set typeID(typeID: CommentsType) {
    this.typeID$.next(typeID);
  }
  public typeID$ = new BehaviorSubject<CommentsType>(null);

  @Input() set limit(limit: number) {
    this.limit$.next(limit);
  }
  public limit$ = new BehaviorSubject<number>(null);

  @Input() set page(page: number) {
    this.page$.next(page);
  }
  public page$ = new BehaviorSubject<number>(null);

  public user$ = this.auth.getUser$();

  public data$ = combineLatest([
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
    private router: Router,
    private commentService: APICommentsService,
    public auth: AuthService,
    private toastService: ToastsService,
    private commentsGrpc: CommentsClient
  ) {}

  public onSent(id: string) {
    this.limit$
      .pipe(
        take(1),
        switchMap((limit) => {
          if (!limit) {
            this.reload$.next(null);
            return EMPTY;
          }

          return this.commentService
            .getComment$(+id, {
              fields: 'page',
              limit: limit,
            })
            .pipe(
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

  public load$(itemID: number, typeID: number, limit: number, page: number): Observable<APICommentGetResponse> {
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
