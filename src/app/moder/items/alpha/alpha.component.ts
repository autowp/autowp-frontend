import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIItem, APIItemList, ItemFields, ItemListOptions, ListItemsRequest, Pages} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';

export interface APIItemAlphaGetResponse {
  groups: string[][];
}

@Component({
  imports: [RouterLink, PaginatorComponent],
  selector: 'app-moder-items-alpha',
  standalone: true,
  templateUrl: './alpha.component.html',
})
export class ModerItemsAlphaComponent implements OnInit, OnDestroy {
  private readonly api = inject(APIService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected char: null | string = null;
  private querySub?: Subscription;
  protected loading = 0;
  protected paginator?: null | Pages = null;
  protected groups: string[][] = [];
  protected items?: APIItem[];

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 74,
        }),
      0,
    );

    this.querySub = combineLatest([
      this.route.queryParamMap,
      this.api.request$<APIItemAlphaGetResponse>('GET', 'item/alpha'),
    ])
      .pipe(
        switchMap(([query, groups]) =>
          combineLatest([
            of(query.get('char')),
            of(groups.groups),
            query.get('char')
              ? this.itemsClient.list(
                  new ListItemsRequest({
                    fields: new ItemFields({nameHtml: true}),
                    language: this.languageService.language,
                    limit: 10,
                    options: new ItemListOptions({
                      name: query.get('char') + '%',
                    }),
                    page: parseInt(query.get('page') ?? '', 10),
                  }),
                )
              : of({
                  items: [] as APIItem[],
                  paginator: undefined,
                } as APIItemList),
          ]),
        ),
      )
      .subscribe(([char, groups, items]) => {
        this.char = char;
        this.groups = groups;
        this.paginator = items.paginator;
        this.items = items.items;
      });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
