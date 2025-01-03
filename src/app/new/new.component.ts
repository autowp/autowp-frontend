import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture} from '@services/picture';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {chunkBy} from '../chunk';
import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../toasts/toasts.service';
import {NewListItemComponent} from './list-item/list-item.component';

interface APINewGroupRepacked {
  chunks?: APIPicture[][];
  item?: APIItem;
  pictures?: APIPicture[];
  total_pictures?: number;
  type: string;
}

interface APINewGroup {
  item: APIItem;
  pictures: APIPicture[];
  total_pictures: number;
  type: string;
}

interface DayCount {
  count: number;
  date: string;
}

interface APINewGetResponse {
  current: DayCount;
  groups: APINewGroup[];
  next: DayCount;
  paginator: APIPaginator;
  prev: DayCount;
}

@Component({
  imports: [RouterLink, NewListItemComponent, ThumbnailComponent, PaginatorComponent, AsyncPipe, DatePipe],
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent implements OnInit {
  private readonly api = inject(APIService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly date$ = this.route.paramMap.pipe(
    map((params) => params.get('date')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly data$: Observable<{
    current: DayCount;
    groups: (APINewGroupRepacked | null)[];
    next: DayCount;
    paginator: APIPaginator;
    prev: DayCount;
  }> = combineLatest([this.page$, this.date$]).pipe(
    switchMap(([page, date]) => {
      const q: {
        date?: string;
        fields: string;
        page?: string;
      } = {
        fields:
          'pictures.thumb_medium,pictures.votes,pictures.views,' +
          'pictures.comments_count,pictures.name_html,pictures.name_text,' +
          'item_pictures.thumb_medium,item_pictures.name_html,item_pictures.name_text,' +
          'item.name_html,item.name_default,item.description,item.produced,' +
          'item.design,item.can_edit_specs,item.specs_route,' +
          'item.categories.name_html,item.twins_groups',
      };
      if (date) {
        q.date = date;
      }
      if (page) {
        q.page = page.toString();
      }
      return this.api
        .request$<APINewGetResponse>('GET', 'new', {
          params: q,
        })
        .pipe(
          catchError((response: unknown) => {
            this.toastService.handleError(response);
            return EMPTY;
          }),
          map((response) => ({date, response})),
        );
    }),
    switchMap(({date, response}) => {
      if (date !== response.current.date) {
        this.router.navigate(['/new', response.current.date]);
        return EMPTY;
      }
      return of(response);
    }),
    map((response) => ({
      current: response.current,
      groups: response.groups
        .filter((group) => group.type === 'item' || group.type === 'pictures')
        .map((group) => {
          let repackedGroup: APINewGroupRepacked | null = null;

          switch (group.type) {
            case 'item':
              repackedGroup = group;
              break;
            case 'pictures':
              repackedGroup = {
                chunks: chunkBy(group.pictures, 6),
                type: group.type,
              };
              break;
          }

          return repackedGroup;
        }),
      next: response.next,
      paginator: response.paginator,
      prev: response.prev,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 51}), 0);
  }
}
