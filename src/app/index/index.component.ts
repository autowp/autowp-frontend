import { Component, Injectable, OnInit } from '@angular/core';
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
@Injectable()
export class IndexComponent implements OnInit {
  public mosts = [
    {
      route: '/mosts/fastest/roadster',
      name: 'mosts/fastest/roadster',
    },
    {
      route: '/mosts/mighty/sedan/today',
      name: 'mosts/mighty/sedan/today',
    }, {
      route: '/mosts/dynamic/universal/2000-09',
      name: 'mosts/dynamic/universal/2000-09',
    }, {
      route: '/mosts/heavy/truck',
      name: 'mosts/heavy/truck'
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
        name: 'page/1/title',
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
