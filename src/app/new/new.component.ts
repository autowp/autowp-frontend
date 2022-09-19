import { Component, OnInit} from '@angular/core';
import { APIPaginator, APIService } from '../services/api.service';
import { chunkBy } from '../chunk';
import { Router, ActivatedRoute } from '@angular/router';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import { APIPicture } from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';
import {APIItem} from '../services/item';

interface APINewGroupRepacked {
  type: string;
  pictures?: APIPicture[];
  chunks?: APIPicture[][];
  item?: APIItem;
  total_pictures?: number;
}


interface APINewGroup {
  type: string;
  pictures: APIPicture[];
  item: APIItem;
  total_pictures: number;
}

interface DayCount {
  date: string;
  count: number;
}

interface APINewGetResponse {
  paginator: APIPaginator;
  prev: DayCount;
  next: DayCount;
  current: DayCount;
  groups: APINewGroup[];
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  public date$ = this.route.paramMap.pipe(
    map(params => params.get('date')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public data$: Observable<{
    groups: APINewGroupRepacked[];
    paginator: APIPaginator;
    prev: DayCount;
    next: DayCount;
    current: DayCount;
  }> = combineLatest([
    this.page$,
    this.date$
  ]).pipe(
    switchMap(([page, date]) => {
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
      if (date) {
        q.date = date;
      }
      if (page) {
        q.page = page.toString();
      }
      return this.api.request<APINewGetResponse>('GET', 'new', {
        params: q
      }).pipe(
        catchError(response => {
          this.toastService.response(response);
          return EMPTY;
        }),
        map(response => ({date, response}))
      );
    }),
    switchMap(({ date, response }) => {
      if (date !== response.current.date) {
        this.router.navigate(['/new', response.current.date]);
        return EMPTY;
      }
      return of(response);
    }),
    map(response => ({
      paginator: response.paginator,
      prev: response.prev,
      current: response.current,
      next: response.next,
      groups: response.groups.map(group => {
        let repackedGroup: APINewGroupRepacked;

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
      })
    }))
  );

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
        this.pageEnv.set({pageId: 51}),
      0
    );
  }
}
