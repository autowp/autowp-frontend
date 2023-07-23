import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItemParentLanguageGetResponse, APIService} from '@services/api.service';
import {ContentLanguageService} from '@services/content-language';
import {APIItem, ItemService} from '@services/item';
import {APIItemParent} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {getItemTypeTranslation} from '@utils/translations';
import {EMPTY, Observable, Subscription, combineLatest, forkJoin} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-item-parent',
  templateUrl: './item-parent.component.html',
})
export class ModerItemParentComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  protected item: APIItem;
  protected parent: APIItem;
  protected itemParent: APIItemParent;
  protected languages: {
    invalidParams: InvalidParams;
    language: string;
    name: string;
  }[] = [];
  protected readonly typeOptions = [
    {
      name: $localize`Stock model`,
      value: 0,
    },
    {
      name: $localize`Related`,
      value: 1,
    },
    {
      name: $localize`Sport`,
      value: 2,
    },
    {
      name: $localize`Design`,
      value: 3,
    },
  ];

  constructor(
    private readonly api: APIService,
    private readonly ContentLanguage: ContentLanguageService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => ({
          item_id: parseInt(params.get('item_id'), 10),
          parent_id: parseInt(params.get('parent_id'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap((params) => {
          return combineLatest([
            this.api.request<APIItemParent>('GET', 'item-parent/' + params.item_id + '/' + params.parent_id),
            this.itemService.getItem$(params.item_id, {
              fields: ['name_text', 'name_html'].join(','),
            }),
            this.itemService.getItem$(params.parent_id, {
              fields: ['name_text', 'name_html'].join(','),
            }),
            this.ContentLanguage.languages$,
            this.api.request<APIItemParentLanguageGetResponse>(
              'GET',
              'item-parent/' + params.item_id + '/' + params.parent_id + '/language'
            ),
          ]);
        })
      )
      .subscribe(([itemParent, item, parent, languages, itemParentLanguage]) => {
        this.itemParent = itemParent;
        this.item = item;
        this.parent = parent;

        this.languages = languages.map((language) => ({
          invalidParams: null,
          language,
          name: null as string,
        }));

        for (const languageData of itemParentLanguage.items) {
          for (const i of this.languages) {
            if (i.language === languageData.language) {
              i.name = languageData.name;
            }
          }
        }

        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 78,
          title: getItemTypeTranslation(this.item.item_type_id, 'name') + ': ' + this.item.name_text,
        });
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  protected reloadItemParent() {
    this.api
      .request<APIItemParent>('GET', 'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id)
      .subscribe((response) => {
        this.itemParent = response;
      });
  }

  protected save() {
    const promises: Observable<void>[] = [
      this.api.request<void>('PUT', 'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id, {
        body: {
          catname: this.itemParent.catname,
          type_id: this.itemParent.type_id,
        },
      }),
    ];

    for (const language of this.languages) {
      language.invalidParams = null;
      promises.push(
        this.api
          .request<void>(
            'PUT',
            'item-parent/' +
              this.itemParent.item_id +
              '/' +
              this.itemParent.parent_id +
              '/language/' +
              language.language,
            {
              body: {
                name: language.name,
              },
            }
          )
          .pipe(
            catchError((response: unknown) => {
              if (response instanceof HttpErrorResponse) {
                language.invalidParams = response.error.invalid_params;
              }
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
