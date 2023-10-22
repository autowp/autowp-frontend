import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture} from '@services/picture';
import {APIUser} from '@services/user';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

export interface APILog {
  date: string;
  desc: string;
  items: APIItem[];
  pictures: APIPicture[];
  user: APIUser;
}

export interface APILogGetResponse {
  items: APILog[];
  paginator: APIPaginator;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
  protected readonly response$ = this.route.queryParamMap.pipe(
    map((params) => ({
      article_id: params.get('article_id'),
      item_id: params.get('item_id'),
      page: params.get('page'),
      picture_id: params.get('picture_id'),
      user_id: params.get('user_id'),
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) => {
      const qParams: {[param: string]: string} = {
        fields: 'pictures.name_html,items.name_html,user',
      };

      if (params.article_id) {
        qParams.article_id = params.article_id;
      }

      if (params.item_id) {
        qParams.item_id = params.item_id;
      }

      if (params.picture_id) {
        qParams.picture_id = params.picture_id;
      }

      if (params.page) {
        qParams.page = params.page;
      }

      if (params.user_id) {
        qParams.user_id = params.user_id;
      }

      return this.api.request<APILogGetResponse>('GET', 'log', {
        params: qParams,
      });
    }),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 75}), 0);
  }
}
