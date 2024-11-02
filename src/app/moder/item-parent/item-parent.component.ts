import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIGetItemParentLanguagesRequest, APIItem, ItemFields, ItemParentLanguage, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {Empty} from '@ngx-grpc/well-known-types';
import {APIService} from '@services/api.service';
import {ContentLanguageService} from '@services/content-language';
import {APIItemParent} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {getItemTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, forkJoin, Observable, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, FormsModule, InvalidParamsPipe],
  selector: 'app-moder-item-parent',
  standalone: true,
  templateUrl: './item-parent.component.html',
})
export class ModerItemParentComponent implements OnInit, OnDestroy {
  private readonly api = inject(APIService);
  private readonly ContentLanguage = inject(ContentLanguageService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly toastService = inject(ToastsService);

  private routeSub?: Subscription;
  protected item?: APIItem;
  protected parent?: APIItem;
  protected itemParent?: APIItemParent;
  protected languages: {
    invalidParams: InvalidParams | null;
    language: string;
    name: null | string;
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

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map((params) => ({
          item_id: parseInt(params.get('item_id') ?? '', 10),
          parent_id: parseInt(params.get('parent_id') ?? '', 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap((params) => {
          return combineLatest([
            this.api.request$<APIItemParent>('GET', 'item-parent/' + params.item_id + '/' + params.parent_id),
            this.itemsClient.item(
              new ItemRequest({
                fields: new ItemFields({
                  nameHtml: true,
                  nameText: true,
                }),
                id: '' + params.item_id,
                language: this.languageService.language,
              }),
            ),
            this.itemsClient.item(
              new ItemRequest({
                fields: new ItemFields({
                  nameHtml: true,
                  nameText: true,
                }),
                id: '' + params.parent_id,
                language: this.languageService.language,
              }),
            ),
            this.ContentLanguage.languages$,
            this.itemsClient.getItemParentLanguages(
              new APIGetItemParentLanguagesRequest({
                itemId: '' + params.item_id,
                parentId: '' + params.parent_id,
              }),
            ),
          ]);
        }),
      )
      .subscribe(([itemParent, item, parent, languages, itemParentLanguage]) => {
        this.itemParent = itemParent;
        this.item = item;
        this.parent = parent;

        this.languages = languages.map((language) => ({
          invalidParams: null,
          language,
          name: null,
        }));

        for (const languageData of itemParentLanguage.items ? itemParentLanguage.items : []) {
          for (const i of this.languages) {
            if (i.language === languageData.language) {
              i.name = languageData.name;
            }
          }
        }

        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 78,
          title: getItemTypeTranslation(this.item.itemTypeId, 'name') + ': ' + this.item.nameText,
        });
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  protected reloadItemParent() {
    if (this.itemParent) {
      this.api
        .request$<APIItemParent>('GET', 'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id)
        .subscribe((response) => {
          this.itemParent = response;
        });
    }
  }

  protected save() {
    if (!this.itemParent) {
      return;
    }
    const promises: Observable<Empty | void>[] = [
      this.api.request$<Empty | void>(
        'PUT',
        'item-parent/' + this.itemParent.item_id + '/' + this.itemParent.parent_id,
        {
          body: {
            catname: this.itemParent.catname,
            type_id: this.itemParent.type_id,
          },
        },
      ),
    ];

    for (const language of this.languages) {
      language.invalidParams = null;
      promises.push(
        this.itemsClient
          .setItemParentLanguage(
            new ItemParentLanguage({
              itemId: '' + this.itemParent.item_id,
              language: language.language,
              name: language.name ?? undefined,
              parentId: '' + this.itemParent.parent_id,
            }),
          )
          .pipe(
            catchError((response: unknown) => {
              if (response instanceof GrpcStatusEvent) {
                const fieldViolations = extractFieldViolations(response);
                language.invalidParams = fieldViolations2InvalidParams(fieldViolations);
              } else {
                this.toastService.handleError(response);
              }
              return EMPTY;
            }),
          ),
      );
    }

    forkJoin(promises).subscribe(() => {
      this.reloadItemParent();
    });
  }
}
