import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '../services/page-env.service';
import {APIItem} from '../services/item';
import {APIService} from '../services/api.service';
import {ItemsClient, UsersClient} from '@grpc/spec.pbsc';
import {APIGetUserRequest, GetTopPersonsListRequest, PictureItemType} from '@grpc/spec.pb';
import {LanguageService} from '../services/language';
import {switchMap} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';

interface APIIndexItemOfDay {
  user_id: string;
  item: APIItem;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  public mosts = [
    {
      route: '/mosts/fastest/roadster',
      name: $localize`Most fastest roadsters`,
    },
    {
      route: '/mosts/mighty/sedan/today',
      name: $localize`Most mighty sedans today`,
    },
    {
      route: '/mosts/dynamic/universal/2000-09',
      name: $localize`Most dynamic universals in 2000's`,
    },
    {
      route: '/mosts/heavy/truck',
      name: $localize`Most heavy trucks`,
    },
  ];
  public itemOfDay$ = this.api
    .request<APIIndexItemOfDay>('GET', 'index/item-of-day')
    .pipe(
      switchMap((itemOfDay) =>
        combineLatest([
          itemOfDay.user_id ? this.usersClient.getUser(new APIGetUserRequest({userId: itemOfDay.user_id})) : of(null),
          of(itemOfDay),
        ])
      )
    );

  public contentPersons$ = this.items.getTopPersonsList(
    new GetTopPersonsListRequest({
      language: this.languageService.language,
      pictureItemType: PictureItemType.PICTURE_CONTENT,
    })
  );
  public authorPersons$ = this.items.getTopPersonsList(
    new GetTopPersonsListRequest({
      language: this.languageService.language,
      pictureItemType: PictureItemType.PICTURE_AUTHOR,
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private api: APIService,
    private items: ItemsClient,
    public languageService: LanguageService,
    private usersClient: UsersClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 1});
    }, 0);
  }
}
