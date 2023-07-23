import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIPaginator, APIService} from '@services/api.service';
import {APIItem, APIItemsGetResponse, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {Subscription, combineLatest, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export interface APIItemAlphaGetResponse {
  groups: string[][];
}

@Component({
  selector: 'app-moder-items-alpha',
  templateUrl: './alpha.component.html',
})
export class ModerItemsAlphaComponent implements OnInit, OnDestroy {
  protected char: string;
  private querySub: Subscription;
  protected loading = 0;
  protected paginator: APIPaginator | null = null;
  protected groups: string[][];
  protected items: APIItem[];

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 74,
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = combineLatest([
      this.route.queryParamMap,
      this.api.request<APIItemAlphaGetResponse>('GET', 'item/alpha'),
    ])
      .pipe(
        switchMap(([query, groups]) =>
          combineLatest([
            of(query.get('char')),
            of(groups.groups),
            query.get('char')
              ? this.itemService.getItems$({
                  fields: 'name_html',
                  limit: 10,
                  name: query.get('char') + '%',
                  page: parseInt(query.get('page'), 10),
                })
              : of({
                  items: [],
                  paginator: null,
                } as APIItemsGetResponse),
          ])
        )
      )
      .subscribe(([char, groups, items]) => {
        this.char = char;
        this.groups = groups;
        this.paginator = items.paginator;
        this.items = items.items;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
