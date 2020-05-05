import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../services/api.service';
import { chunkBy } from '../chunk';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { APIPicture } from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

export interface APINewGroup {
  type: string;
  pictures: APIPicture[];
}

export interface APINewGetResponse {
  paginator: APIPaginator;
  prev: {
    date: string;
    count: number;
  };
  next: {
    date: string;
    count: number;
  };
  current: {
    date: string;
    count: number;
  };
  groups: APINewGroup[];
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
@Injectable()
export class NewComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public paginator: APIPaginator;
  public groups: any[] = [];
  public date: string;
  public prev: {
    date: string;
    count: number;
  };
  public next: {
    date: string;
    count: number;
  };
  public current: {
    date: string;
    count: number;
  };

  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/51/name',
          pageId: 51
        }),
      0
    );

    this.routeSub = combineLatest([
      this.route.queryParamMap.pipe(
        map(params => parseInt(params.get('page'), 10))
      ),
      this.route.paramMap.pipe(
        map(params => params.get('date'))
      )
    ])
      .pipe(
        map(([page, date]) => ({ page, date })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          const q: {
            date?: string;
            fields: string;
            page?: string;
          } = {
            fields:
              'pictures.owner,pictures.thumb_medium,pictures.votes,pictures.views,' +
              'pictures.comments_count,pictures.name_html,pictures.name_text,' +
              'item_pictures.thumb_medium,item_pictures.name_html,item_pictures.name_text,' +
              'item.name_html,item.name_default,item.description,item.produced,' +
              'item.design,item.can_edit_specs,item.specs_route,' +
              'item.categories.name_html,item.twins_groups'
          };
          if (params.date) {
            q.date = params.date;
          }
          if (params.page) {
            q.page = params.page.toString();
          }
          return this.api.request<APINewGetResponse>('GET', 'new', {
            params: q
          }).pipe(
            map(response => ({ params, response }))
          );
        })
      )
      .subscribe(
        data => {
          if (data.params.date !== data.response.current.date) {
            this.router.navigate(['/new', data.response.current.date]);
            return;
          }

          this.date = data.params.date;
          this.paginator = data.response.paginator;
          this.prev = data.response.prev;
          this.current = data.response.current;
          this.next = data.response.next;
          this.groups = [];

          this.groups = data.response.groups.map(group => {
            let repackedGroup: any;

            switch (group.type) {
              case 'item':
                repackedGroup = group;
                break;
              case 'pictures':
                repackedGroup = {
                  type: group.type,
                  chunks: chunkBy(group.pictures, 6)
                };
                break;
            }

            return repackedGroup;
          });
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
