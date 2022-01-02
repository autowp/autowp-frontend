import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '../services/page-env.service';
import {APIUser} from '../services/user';
import {APIItem} from '../services/item';
import {APIService} from '../services/api.service';
import {ItemsClient} from '../../../generated/spec.pbsc';
import {GetTopPersonsListRequest, PictureItemType} from '../../../generated/spec.pb';
import {LanguageService} from '../services/language';

interface APIIndexItemOfDay {
  user: APIUser;
  item: APIItem;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.components.scss']
})
export class IndexComponent implements OnInit {
  public mosts = [
    {
      route: '/mosts/fastest/roadster',
      name: $localize `Most fastest roadsters`,
    },
    {
      route: '/mosts/mighty/sedan/today',
      name: $localize `Most mighty sedans today`,
    }, {
      route: '/mosts/dynamic/universal/2000-09',
      name: $localize `Most dynamic universals in 2000's`,
    }, {
      route: '/mosts/heavy/truck',
      name: $localize `Most heavy trucks`
    }
  ];
  public itemOfDay$ = this.api.request<APIIndexItemOfDay>('GET', 'index/item-of-day');
  public contentPersons$ = this.items.getTopPersonsList(new GetTopPersonsListRequest({
    language: this.languageService.language,
    pictureItemType: PictureItemType.PICTURE_CONTENT
  }));
  public authorPersons$ = this.items.getTopPersonsList(new GetTopPersonsListRequest({
    language: this.languageService.language,
    pictureItemType: PictureItemType.PICTURE_AUTHOR
  }));

  constructor(private pageEnv: PageEnvService, private api: APIService, private items: ItemsClient, private languageService: LanguageService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        nameTranslated: $localize `Index page`,
        pageId: 1
      });
    }, 0);
  }
}
