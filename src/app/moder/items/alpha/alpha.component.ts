import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../../../services/api.service';
import {ItemService, APIItem, APIItemsGetResponse} from '../../../services/item';
import { Subscription, combineLatest, of} from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { PageEnvService } from '../../../services/page-env.service';
import { switchMap} from 'rxjs/operators';

// Acl.inheritsRole('moder', 'unauthorized');

export interface APIItemAlphaGetResponse {
  groups: string[][];
}

@Component({
  selector: 'app-moder-items-alpha',
  templateUrl: './alpha.component.html'
})
@Injectable()
export class ModerItemsAlphaComponent implements OnInit, OnDestroy {
  public char: string;
  private querySub: Subscription;
  public loading = 0;
  public paginator: APIPaginator | null = null;
  public groups: string[][];
  public items: APIItem[];

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: 'page/74/name',
          pageId: 74
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = combineLatest([
      this.route.queryParamMap,
      this.api.request<APIItemAlphaGetResponse>('GET', 'item/alpha')
    ])
      .pipe(
        switchMap(([query, groups]) => combineLatest([
          of(query.get('char')),
          of(groups.groups),
          query.get('char')
            ? this.itemService.getItems({
              name: query.get('char') + '%',
              page: parseInt(query.get('page'), 10),
              limit: 10,
              fields: 'name_html'
            })
            : of({
              items: [],
              paginator: null
            } as APIItemsGetResponse)
        ]))
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
