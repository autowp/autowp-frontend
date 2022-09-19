import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import {
  ItemService,
  GetItemsServiceOptions,
  APIItem
} from '../../services/item';
import { UserService, APIUser } from '../../services/user';
import {Subscription, Observable, of, EMPTY, combineLatest} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {switchMap, debounceTime, catchError, map, distinctUntilChanged} from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {APIComment, APICommentsService} from '../../api/comments/comments.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-comments',
  templateUrl: './comments.component.html'
})
export class ModerCommentsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public loading = 0;
  public comments: APIComment[] = [];
  public paginator: APIPaginator;
  public moderatorAttention: any;

  public itemID: number;
  public itemQuery = '';
  public itemsDataSource: (text$: Observable<string>) => Observable<any[]>;

  public userID: number;
  public userQuery = '';
  public usersDataSource: (text$: Observable<string>) => Observable<any[]>;

  public userID$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('user_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private moderatorAttention$ = this.route.queryParamMap.pipe(
    map(params => params.get('moderator_attention')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private picturesOfItemID$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('pictures_of_item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private route: ActivatedRoute,
    private commentService: APICommentsService,
    private pageEnv: PageEnvService,
    private router: Router,
    private toastService: ToastsService
  ) {
    this.itemsDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap(query => {
          if (query === '') {
            return of([]);
          }

          const params: GetItemsServiceOptions = {
            limit: 10,
            fields: 'name_text,name_html',
            id: 0,
            name: ''
          };
          if (query.substring(0, 1) === '#') {
            params.id = parseInt(query.substring(1), 10);
          } else {
            params.name = '%' + query + '%';
          }

          return this.itemService.getItems(params).pipe(
            catchError((err, caught) => {
              console.log(err, caught);
              return EMPTY;
            }),
            map(response => response.items)
          );
        })
      );

    this.usersDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap(query => {
          if (query === '') {
            return of([]);
          }

          const params = {
            limit: 10,
            id: [],
            search: ''
          };
          if (query.substring(0, 1) === '#') {
            params.id.push(parseInt(query.substring(1), 10));
          } else {
            params.search = query;
          }

          return this.userService.get(params).pipe(
            catchError((err, caught) => {
              console.log(err, caught);
              return EMPTY;
            }),
            map(response => response.items)
          );
        })
      );
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          pageId: 110
        }),
      0
    );

    this.querySub = combineLatest([
      this.userID$,
      this.moderatorAttention$,
      this.picturesOfItemID$,
      this.page$
    ]).pipe(
      switchMap(([userID, moderatorAttention, picturesOfItemID, page]) => {
        this.userID = userID;
        this.moderatorAttention = moderatorAttention === undefined ? null : +moderatorAttention;
        this.itemID = picturesOfItemID;

        this.loading++;

        return this.commentService.getComments({
          user: this.userID,
          moderator_attention: this.moderatorAttention,
          pictures_of_item_id: this.itemID ? this.itemID : 0,
          page,
          order: 'date_desc',
          limit: 30,
          fields: ['preview', 'user', 'is_new', 'status', 'route']
        });
      })
    ).subscribe({
      next: response => {
        this.comments = response.items;
        this.paginator = response.paginator;
        this.loading--;
      },
      error: response => {
        this.toastService.response(response);
        this.loading--;
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public setModeratorAttention() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        moderator_attention: this.moderatorAttention
      },
      queryParamsHandling: 'merge'
    });
  }

  public itemFormatter(x: APIItem) {
    return x.name_text;
  }

  public itemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        pictures_of_item_id: e.item.id
      }
    });
  }

  public clearItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        pictures_of_item_id: null
      }
    });
  }

  public userFormatter(x: APIUser) {
    return x.name;
  }

  public userOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: e.item.id
      }
    });
  }

  public clearUser(): void {
    this.userQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        user_id: null
      }
    });
  }
}
