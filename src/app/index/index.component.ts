import { Component, Injectable, OnInit } from '@angular/core';
import { PageEnvService } from '../services/page-env.service';
import {HttpClient} from '@angular/common/http';
import {APIUser} from '../services/user';
import {APIItem} from '../services/item';

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
      url: '/mosts/fastest/roadster',
      name: 'mosts/fastest/roadster',
    },
    {
      url: '/mosts/mighty/sedan/today',
      name: 'mosts/mighty/sedan/today',
    }, {
      url: '/mosts/dynamic/universal/2000-09',
      name: 'mosts/dynamic/universal/2000-09',
    }, {
      url: '/mosts/heavy/truck',
      name: 'mosts/heavy/truck'
    }
  ];
  public contentPersons: APIIndexPersonsItem[];
  public contentPersonsLoaded = false;
  public persons: APIIndexPersonsItem[];
  public personsLoaded = false;
  public itemOfDay: APIIndexItemOfDay;
  public itemOfDayLoaded = false;

  constructor(private pageEnv: PageEnvService, private http: HttpClient) {}

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

    this.http.get<APIIndexPersonsResponse>('/api/index/persons-content').subscribe({
      next: response => { this.contentPersons = response.items; },
      complete: () => { this.contentPersonsLoaded = true; }
    });

    this.http.get<APIIndexPersonsResponse>('/api/index/persons-author').subscribe({
      next: response => { this.persons = response.items; },
      complete: () => { this.personsLoaded = true; }
    });

    this.http.get<APIIndexItemOfDay>('/api/index/item-of-day').subscribe({
      next: response => { this.itemOfDay = response; },
      complete: () => { this.itemOfDayLoaded = true; }
    });
  }
}
