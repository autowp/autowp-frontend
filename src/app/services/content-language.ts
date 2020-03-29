import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APIService } from './api.service';

export interface APIContentLanguageGetResponse {
  items: string[];
}

@Injectable()
export class ContentLanguageService {
  private readonly languages$: Observable<string[]>;

  constructor(private api: APIService) {
    this.languages$ = this.api.request<APIContentLanguageGetResponse>('GET', 'content-language').pipe(
      map(response => response.items),
      shareReplay(1)
    );
  }

  public getList(): Observable<string[]> {
    return this.languages$;
  }
}
