import { Component, OnInit } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';
import {APIUser} from '../services/user';
import {APIItem} from '../services/item';
import { APIService } from '../services/api.service';

interface APIIndexPersonsItem {
  id: number;
  name: string;
}

interface APIIndexPersonsResponse {
  items: APIIndexPersonsItem[];
}

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
  public contentPersons: APIIndexPersonsItem[];
  public contentPersonsLoaded = false;
  public persons: APIIndexPersonsItem[];
  public personsLoaded = false;
  public itemOfDay: APIIndexItemOfDay;
  public itemOfDayLoaded = false;

  constructor(private pageEnv: PageEnvService, private api: APIService) {}

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

    this.api.request<APIIndexPersonsResponse>('GET', 'index/persons-content').subscribe({
      next: response => { this.contentPersons = response.items; },
      complete: () => { this.contentPersonsLoaded = true; }
    });

    this.api.request<APIIndexPersonsResponse>('GET', 'index/persons-author').subscribe({
      next: response => { this.persons = response.items; },
      complete: () => { this.personsLoaded = true; }
    });

    this.api.request<APIIndexItemOfDay>('GET', 'index/item-of-day').subscribe({
      next: response => { this.itemOfDay = response; },
      complete: () => { this.itemOfDayLoaded = true; }
    });
  }
}
