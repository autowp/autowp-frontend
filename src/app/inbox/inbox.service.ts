import {Injectable} from '@angular/core';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {Observable} from 'rxjs';

export interface APIInbox {
  brands: APIItem[];
  current: {
    count: number;
    date: string;
  };
  next: {
    count: number;
    date: string;
  } | null;
  paginator: APIPaginator;
  prev: {
    count: number;
    date: string;
  } | null;
}

@Injectable()
export class InboxService {
  constructor(private readonly api: APIService) {}

  public get$(brandID: number, date: string): Observable<APIInbox> {
    const params: {[param: string]: string} = {
      brand_id: brandID ? brandID.toString() : '',
    };
    if (date) {
      params.date = date;
    }

    return this.api.request<APIInbox>('GET', 'inbox', {params});
  }
}
