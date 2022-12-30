import {Injectable} from '@angular/core';
import {APIPaginator, APIService} from '../services/api.service';
import {APIItem} from '../services/item';
import {Observable} from 'rxjs';

export interface APIInbox {
  paginator: APIPaginator;
  prev: {
    date: string;
    count: number;
  } | null;
  current: {
    date: string;
    count: number;
  };
  next: {
    date: string;
    count: number;
  } | null;
  brands: APIItem[];
}

@Injectable()
export class InboxService {
  constructor(private api: APIService) {}

  public get(brandID: number, date: string): Observable<APIInbox> {
    const params: {[param: string]: string} = {
      brand_id: brandID ? brandID.toString() : '',
    };
    if (date) {
      params.date = date;
    }

    return this.api.request<APIInbox>('GET', 'inbox', {params});
  }
}
