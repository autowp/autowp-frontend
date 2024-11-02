import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APICommentsMessage,
  APIGetUserRequest,
  APIItem,
  APIUser,
  APIUser as APIUser2,
  APIUsersRequest,
  CommentMessageFields,
  GetMessagesRequest,
  ItemFields,
  ItemListOptions,
  ListItemsRequest,
  ModeratorAttention,
  Pages,
  PictureStatus,
} from '@grpc/spec.pb';
import {CommentsClient, ItemsClient, UsersClient} from '@grpc/spec.pbsc';
import {NgbTypeahead, NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [RouterLink, FormsModule, NgbTypeahead, UserComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-moder-comments',
  standalone: true,
  templateUrl: './comments.component.html',
})
export class ModerCommentsComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastsService);
  private readonly commentsClient = inject(CommentsClient);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly usersClient = inject(UsersClient);

  protected moderatorAttention?: ModeratorAttention;

  protected itemID: null | string = null;
  protected itemQuery = '';
  protected readonly itemsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([] as APIItem[]);
        }

        const params = new ListItemsRequest({
          fields: new ItemFields({nameHtml: true, nameText: true}),
          language: this.languageService.language,
          limit: 10,
        });
        const options = new ItemListOptions();
        if (query.startsWith('#')) {
          options.id = query.substring(1);
        } else {
          options.name = '%' + query + '%';
        }
        params.options = options;

        return this.itemsClient.list(params).pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
          map((response) => response.items || []),
        );
      }),
    );

  private userID: null | string = null;
  protected userQuery = '';
  protected readonly usersDataSource: (text$: Observable<string>) => Observable<APIUser[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        if (query.startsWith('#')) {
          return this.usersClient.getUser(new APIGetUserRequest({userId: query.substring(1) || ''})).pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((user) => [user]),
          );
        }

        return this.usersClient
          .getUsers(
            new APIUsersRequest({
              limit: '10',
              search: query,
            }),
          )
          .pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items || []),
          );
      }),
    );

  protected readonly PictureStatus = PictureStatus;

  protected readonly userID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('user_id')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly moderatorAttention$: Observable<ModeratorAttention> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('moderator_attention') ?? '', 10) as ModeratorAttention),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly picturesOfItemID$ = this.route.queryParamMap.pipe(
    map((params) => params.get('pictures_of_item_id')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly data$: Observable<{
    comments: {comment: APICommentsMessage; user$: Observable<APIUser2 | null>}[];
    paginator?: Pages;
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
          picturesOfItemId: this.itemID ? this.itemID : undefined,
          userId: this.userID ? this.userID : undefined,
        }),
      );
    }),
    catchError((error: unknown) => {
      this.toastService.handleError(error);

      return EMPTY;
    }),
    map((response) => ({
      comments: (response.items ? response.items : []).map((comment) => ({
        comment,
        user$: this.userService.getUser$(comment.authorId),
      })),
      paginator: response.paginator,
    })),
  );

  protected readonly ModeratorAttention = ModeratorAttention;

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 110,
        }),
      0,
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
    return x.nameText;
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
