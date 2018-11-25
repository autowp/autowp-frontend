import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIPaginator } from './api.service';
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

  private brands$: Observable<APITwinsBrand[]>;

  constructor(private http: HttpClient) {
    this.brands$ = this.http.get<APITwinsGetBrandsResponse>('/api/twins/brands')
      .pipe(
        map(response => response.items),
        shareReplay(1)
      );
  }

  public getBrands(): Observable<APITwinsBrand[]> {
    return this.brands$;
  }
}
