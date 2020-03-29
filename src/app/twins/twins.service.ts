import { Injectable } from '@angular/core';
import { APIPaginator, APIService } from '../services/api.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface APITwinsBrand {
  catname: string;
  name: string;
  count: number;
  new_count: number;
}

export interface APITwinsGetBrandsResponse {
  items: APITwinsBrand[];
  paginator: APIPaginator;
}

@Injectable()
export class TwinsService {

  private readonly brands$: Observable<APITwinsBrand[]>;

  constructor(private api: APIService) {
    this.brands$ = this.api.request<APITwinsGetBrandsResponse>('GET', 'twins/brands')
      .pipe(
        map(response => response.items),
        shareReplay(1)
      );
  }

  public getBrands(): Observable<APITwinsBrand[]> {
    return this.brands$;
  }
}
