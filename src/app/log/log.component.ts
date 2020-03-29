import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { APIUser } from '../services/user';
import { APIItem } from '../services/item';
import { APIPicture } from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

// Acl.inheritsRole('moder', 'unauthorized');

export interface APILog {
  user: APIUser;
  date: string;
  desc: string;
  items: APIItem[];
  pictures: APIPicture[];
}

export interface APILogGetResponse {
  items: APILog[];
  paginator: APIPaginator;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html'
})
@Injectable()
export class LogComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public items: APILog[] = [];
  public paginator: APIPaginator;

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/75/name',
          pageId: 75
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParams
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params => {
          const qParams: { [param: string]: string } = {
            fields: 'pictures.name_html,items.name_html,user'
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
            params: qParams
          });
        })
      )
      .subscribe(
        response => {
          this.items = response.items;
          this.paginator = response.paginator;
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
