import {Component, OnInit} from '@angular/core';
import {APIGetUserRequest, APIUser, GetTopPersonsListRequest, PictureItemType} from '@grpc/spec.pb';
import {ItemsClient, UsersClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem, ItemOfDayItem} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {Observable, combineLatest, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

interface APIIndexItemOfDay {
  item: ItemOfDayItem;
  user_id: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  protected readonly mosts = [
    {
      name: $localize`Most fastest roadsters`,
      route: '/mosts/fastest/roadster',
    },
    {
      name: $localize`Most mighty sedans today`,
      route: '/mosts/mighty/sedan/today',
    },
    {
      name: $localize`Most dynamic universals in 2000's`,
      route: '/mosts/dynamic/universal/2000-09',
    },
    {
      name: $localize`Most heavy trucks`,
      route: '/mosts/heavy/truck',
    },
  ];

  protected readonly itemOfDay$: Observable<{item: APIItem; user: APIUser | null}> = this.api
    .request<APIIndexItemOfDay>('GET', 'index/item-of-day')
    .pipe(
      switchMap((itemOfDay) =>
        combineLatest([
          itemOfDay.user_id ? this.usersClient.getUser(new APIGetUserRequest({userId: itemOfDay.user_id})) : of(null),
          of(itemOfDay.item),
        ]),
      ),
      map(([user, item]) => ({item, user})),
      shareReplay(1),
    );

  protected readonly itemOfDayItem$ = this.itemOfDay$.pipe(map((itemOfDay) => itemOfDay.item));
  protected readonly itemOfDayUser$ = this.itemOfDay$.pipe(map((itemOfDay) => itemOfDay.user));

  protected readonly contentPersons$ = this.items.getTopPersonsList(
    new GetTopPersonsListRequest({
      language: this.languageService.language,
      pictureItemType: PictureItemType.PICTURE_ITEM_CONTENT,
    }),
  );
  protected readonly authorPersons$ = this.items.getTopPersonsList(
    new GetTopPersonsListRequest({
      language: this.languageService.language,
      pictureItemType: PictureItemType.PICTURE_ITEM_AUTHOR,
    }),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly api: APIService,
    private readonly items: ItemsClient,
    protected readonly languageService: LanguageService,
    private readonly usersClient: UsersClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 1});
    }, 0);
  }
}
