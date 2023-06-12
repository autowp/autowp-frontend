import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';
import {
  APICommentsMessage,
  APICommentsMessages,
  CommentMessageFields,
  CommentsType,
  CommentsViewRequest,
  GetMessagePageRequest,
  GetMessagesRequest,
  Pages,
} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  private readonly reload$ = new BehaviorSubject<null>(null);

  @Input() set itemID(itemID: string) {
    this.itemID$.next(itemID);
  }
  protected readonly itemID$ = new BehaviorSubject<string>(null);

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

  protected readonly data$: Observable<{messages: APICommentsMessage[]; paginator: Pages}> = combineLatest([
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

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly router: Router,
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

  protected load$(itemID: string, typeID: CommentsType, limit: number, page: number): Observable<APICommentsMessages> {
    if (!typeID || !itemID) {
      return EMPTY;
    }

    return this.commentsGrpc.getMessages(
      new GetMessagesRequest({
        typeId: typeID,
        itemId: itemID,
        noParents: true,
        fields: new CommentMessageFields({
          replies: true,
          text: true,
          vote: true,
          userVote: true,
        }),
        order: GetMessagesRequest.Order.DATE_DESC,
        limit: limit ? limit : null,
        page: page,
      })
    );
  }
}
