import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
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
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);
  private readonly toastService = inject(ToastsService);
  private readonly commentsGrpc = inject(CommentsClient);

  private readonly reload$ = new BehaviorSubject<void>(void 0);

  @Input() set itemID(itemID: string) {
    this.itemID$.next(itemID);
  }
  protected readonly itemID$ = new BehaviorSubject<null | string>(null);

  @Input() set typeID(typeID: CommentsType) {
    this.typeID$.next(typeID);
  }
  protected readonly typeID$ = new BehaviorSubject<CommentsType | null>(null);

  @Input() set limit(limit: null | number) {
    this.limit$.next(limit);
  }
  protected readonly limit$ = new BehaviorSubject<null | number>(null);

  @Input() set page(page: number) {
    this.page$.next(page);
  }
  protected readonly page$ = new BehaviorSubject<null | number>(null);

  protected readonly user$ = this.auth.getUser$();

  protected readonly data$: Observable<{messages: APICommentsMessage[]; paginator?: Pages}> = combineLatest([
    this.user$,
    this.itemID$.pipe(debounceTime(10), distinctUntilChanged()),
    this.typeID$.pipe(debounceTime(10), distinctUntilChanged()),
    this.limit$.pipe(debounceTime(10), distinctUntilChanged()),
    this.page$.pipe(debounceTime(10), distinctUntilChanged()),
    this.reload$,
  ]).pipe(
    switchMap(([user, itemID, typeID, limit, page]) =>
      typeID && itemID
        ? this.load$(itemID, typeID, limit, page).pipe(
            tap(() => {
              if (user) {
                this.commentsGrpc
                  .view(
                    new CommentsViewRequest({
                      itemId: '' + itemID,
                      typeId: typeID ? typeID : undefined,
                    }),
                  )
                  .subscribe();
              }
            }),
            map((response) => ({
              messages: response.items ? response.items : [],
              paginator: response.paginator,
            })),
          )
        : EMPTY,
    ),
  );

  protected readonly CommentsType = CommentsType;

  protected onSent(id: string) {
    this.limit$
      .pipe(
        take(1),
        switchMap((limit) => {
          if (!limit) {
            this.reload$.next();
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
                    this.reload$.next();
                  }
                }),
              ),
            ),
          );
        }),
      )
      .subscribe();
  }

  protected load$(
    itemID: string,
    typeID: CommentsType,
    limit: null | number | undefined,
    page: null | number | undefined,
  ): Observable<APICommentsMessages> {
    return this.commentsGrpc.getMessages(
      new GetMessagesRequest({
        fields: new CommentMessageFields({
          replies: true,
          text: true,
          userVote: true,
          vote: true,
        }),
        itemId: itemID,
        limit: limit ? limit : undefined,
        noParents: true,
        order: GetMessagesRequest.Order.DATE_ASC,
        page: page ? page : undefined,
        typeId: typeID,
      }),
    );
  }
}
