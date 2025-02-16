import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {APIService} from './api.service';

export interface APITimezoneGetResponse {
  items: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  readonly #api = inject(APIService);

  readonly #timezones$: Observable<string[]> = this.#api.request$<APITimezoneGetResponse>('GET', 'timezone').pipe(
    map((response) => response.items),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  public getTimezones$(): Observable<string[]> {
    return this.#timezones$;
  }
}
