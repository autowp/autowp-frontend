import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APICommentsMessage,
  APIUser as APIUser2,
  CommentMessageFields,
  GetMessagesRequest,
  ModeratorAttention,
  Pages,
  PictureStatus,
} from '@grpc/spec.pb';
import {CommentsClient} from '@grpc/spec.pbsc';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {APIItem, GetItemsServiceOptions, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIUser, UserService} from '@services/user';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-comments',
  templateUrl: './comments.component.html',
})
export class ModerCommentsComponent implements OnInit {
  protected moderatorAttention: ModeratorAttention;

  protected itemID: string;
  protected itemQuery = '';
  protected readonly itemsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        const params: GetItemsServiceOptions = {
          fields: 'name_text,name_html',
          id: 0,
          limit: 10,
          name: '',
        };
        if (query.substring(0, 1) === '#') {
          params.id = parseInt(query.substring(1), 10);
        } else {
          params.name = '%' + query + '%';
        }

        return this.itemService.getItems$(params).pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
          map((response) => response.items)
        );
      })
    );

  private userID: string;
  protected userQuery = '';
  protected readonly usersDataSource: (text$: Observable<string>) => Observable<APIUser[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        const params = {
          id: [],
          limit: 10,
          search: '',
        };
        if (query.substring(0, 1) === '#') {
          params.id.push(parseInt(query.substring(1), 10));
        } else {
          params.search = query;
        }

        return this.userService.get$(params).pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
          map((response) => response.items)
        );
      })
    );

  protected readonly PictureStatus = PictureStatus;

  protected readonly userID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('user_id')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly moderatorAttention$ = this.route.queryParamMap.pipe(
    map((params) => +params.get('moderator_attention') as ModeratorAttention),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly picturesOfItemID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('pictures_of_item_id')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly data$: Observable<{
    comments: {comment: APICommentsMessage; user$: Observable<APIUser2>}[];
    paginator: Pages;
  }> = combineLatest([this.userID$, this.moderatorAttention$, this.picturesOfItemID$, this.page$]).pipe(
    switchMap(([userID, moderatorAttention, picturesOfItemID, page]) => {
      this.userID = userID;
      this.moderatorAttention = moderatorAttention ? moderatorAttention : ModeratorAttention.NONE;
      this.itemID = picturesOfItemID;

      return this.commentsClient.getMessages(
        new GetMessagesRequest({
          fields: new CommentMessageFields({
            isNew: true,
            preview: true,
            route: true,
            status: true,
          }),
          limit: 30,
          moderatorAttention: this.moderatorAttention,
          order: GetMessagesRequest.Order.DATE_DESC,
          page,
          picturesOfItemId: this.itemID,
          userId: this.userID,
        })
      );
    }),
    catchError((error: unknown) => {
      this.toastService.handleError(error);

      return EMPTY;
    }),
    map((response) => ({
      comments: response.items.map((comment) => ({
        comment,
        user$: this.userService.getUser2$(comment.authorId),
      })),
      paginator: response.paginator,
    }))
  );

  protected readonly ModeratorAttention = ModeratorAttention;

  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router,
    private readonly toastService: ToastsService,
    private readonly commentsClient: CommentsClient
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 110,
        }),
      0
    );
  }

  protected setModeratorAttention() {
    this.router.navigate([], {
      queryParams: {
        moderator_attention: this.moderatorAttention,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected itemFormatter(x: APIItem) {
    return x.name_text;
  }

  protected itemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        pictures_of_item_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParams: {
        pictures_of_item_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected userFormatter(x: APIUser) {
    return x.name;
  }

  protected userOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        user_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearUser(): void {
    this.userQuery = '';
    this.router.navigate([], {
      queryParams: {
        user_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
