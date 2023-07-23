import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {APIService} from './api.service';

export interface APIItemLanguage {
  full_text: string;
  full_text_id: number;
  language: string;
  name: string;
  text: string;
  text_id: number;
}

export interface APIItemLanguageGetResponse {
  items: APIItemLanguage[];
}

@Injectable()
export class ItemLanguageService {
  constructor(private readonly api: APIService) {}

  public getItems$(itemId: number): Observable<APIItemLanguageGetResponse> {
    return this.api.request<APIItemLanguageGetResponse>('GET', 'item/' + itemId + '/language');
  }
}
