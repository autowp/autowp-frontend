import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIItemParentLanguageGetResponse, APIService } from '../../services/api.service';
import { ContentLanguageService } from '../../services/content-language';
import { ItemService, APIItem } from '../../services/item';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription, combineLatest, Observable, forkJoin, EMPTY} from 'rxjs';
import { APIItemParent } from '../../services/item-parent';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError, map
} from 'rxjs/operators';

@Component({
  selector: 'app-moder-item-parent',
  templateUrl: './item-parent.component.html'
})
@Injectable()
export class ModerItemParentComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public item: APIItem;
  public parent: APIItem;
  public itemParent: any;
  public languages: any[] = [];
  public typeOptions = [
    {
      value: 0,
      name: 'catalogue/stock-model'
    },
    {
      value: 1,
      name: 'catalogue/related'
    },
    {
      value: 2,
      name: 'catalogue/sport'
    },
    {
      value: 3,
      name: 'catalogue/design'
    }
  ];

  constructor(
    private api: APIService,
    private translate: TranslateService,
    private ContentLanguage: ContentLanguageService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map(params => ({
          item_id: parseInt(params.get('item_id'), 10),
          parent_id: parseInt(params.get('parent_id'), 10)
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          return combineLatest([
            this.api.request<APIItemParent>('GET', 'item-parent/' + params.item_id + '/' + params.parent_id),
            this.itemService.getItem(params.item_id, {
              fields: ['name_text', 'name_html'].join(',')
            }),
            this.itemService.getItem(params.parent_id, {
              fields: ['name_text', 'name_html'].join(',')
            }),
            this.ContentLanguage.getList(),
            this.api.request<APIItemParentLanguageGetResponse>(
              'GET',
              'item-parent/' + params.item_id + '/' + params.parent_id + '/language'
            )
          ]);
        })
      )
      .subscribe(([itemParent, item, parent, languages, itemParentLanguage]) => {
        this.itemParent = itemParent;
        this.item = item;
        this.parent = parent;

        this.languages = languages.map(language => ({
          language,
          name: null
        }));

        for (const languageData of itemParentLanguage.items) {
          for (const i of this.languages) {
            if (i.language === languageData.language) {
              i.name = languageData.name;
            }
          }
        }

        this.translate
          .get('item/type/' + this.item.item_type_id + '/name')
          .subscribe((translation: string) => {
            this.pageEnv.set({
              layout: {
                isAdminPage: true,
                needRight: false
              },
              nameTranslated: translation + ': ' + this.item.name_text,
              pageId: 78
            });
          });
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public reloadItemParent() {
    this.api
      .request(
        'GET',
        'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id
      )
      .subscribe(response => {
        this.itemParent = response;
      });
  }

  public save() {
    const promises: Observable<void>[] = [
      this.api.request<void>(
        'PUT',
        'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id,
        {body: {
          catname: this.itemParent.catname,
          type_id: this.itemParent.type_id
        }}
      )
    ];

    for (const language of this.languages) {
      language.invalidParams = null;
      promises.push(
        this.api
          .request<void>(
            'PUT',
            'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id + '/language/' + language.language,
            {body: {
              name: language.name
            }}
          )
          .pipe(
            catchError(response => {
              language.invalidParams = response.error.invalid_params;
              return EMPTY;
            })
          )
      );
    }

    forkJoin(promises).subscribe(() => {
      this.reloadItemParent();
    });
  }
}
