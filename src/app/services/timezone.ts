import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {shareReplay, map} from 'rxjs/operators';
import {APIService} from './api.service';

export interface APITimezoneGetResponse {
  items: string[];
}

@Injectable()
export class TimezoneService {
  private readonly timezones$: Observable<string[]>;

  constructor(private readonly api: APIService) {
    this.timezones$ = this.api.request<APITimezoneGetResponse>('GET', 'timezone').pipe(
      map((response) => response.items),
      shareReplay(1)
    );
  }

  public getTimezones$(): Observable<string[]> {
    return this.timezones$;
  }
}
