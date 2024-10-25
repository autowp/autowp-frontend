import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIGetUserRequest, APIUser, GetTopPersonsListRequest, PictureItemType} from '@grpc/spec.pb';
import {ItemsClient, UsersClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem, ItemOfDayItem} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {ItemOfDayComponent} from '../item-of-day/item-of-day/item-of-day.component';
import {IndexBrandsComponent} from './brands/brands.component';
import {IndexCategoriesComponent} from './categories/categories.component';
import {IndexDonateComponent} from './donate/donate.component';
import {IndexFactoriesComponent} from './factories/factories.component';
import {IndexPicturesComponent} from './pictures/pictures.component';
import {IndexSpecsCarsComponent} from './specs-cars/specs-cars.component';
import {IndexTwinsComponent} from './twins/twins.component';

interface APIIndexItemOfDay {
  item: ItemOfDayItem;
  user_id: string;
}

@Component({
  imports: [
    ItemOfDayComponent,
    IndexDonateComponent,
    IndexBrandsComponent,
    IndexPicturesComponent,
    IndexTwinsComponent,
    IndexCategoriesComponent,
    RouterLink,
    MarkdownComponent,
    IndexFactoriesComponent,
    IndexSpecsCarsComponent,
    AsyncPipe,
  ],
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);
  private readonly api = inject(APIService);
  private readonly items = inject(ItemsClient);
  protected readonly languageService = inject(LanguageService);
  private readonly usersClient = inject(UsersClient);

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
    .request$<APIIndexItemOfDay>('GET', 'index/item-of-day')
    .pipe(
      switchMap((itemOfDay) =>
        combineLatest([
          itemOfDay.user_id ? this.usersClient.getUser(new APIGetUserRequest({userId: itemOfDay.user_id})) : of(null),
          of(itemOfDay.item),
        ]),
      ),
      map(([user, item]) => ({item, user})),
      shareReplay({bufferSize: 1, refCount: false}),
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

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 1});
    }, 0);
  }
}
