import {Component, Input} from '@angular/core';
import {APIGetItemLanguagesRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {ContentLanguageService} from '@services/content-language';
import {APIItem} from '@services/item';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export interface ItemLanguage {
  fullText: null | string;
  fullTextId: null | string;
  language: string;
  name: null | string;
  text: null | string;
  textId: null | string;
}

@Component({
  selector: 'app-moder-items-item-name',
  templateUrl: './name.component.html',
})
export class ModerItemsItemNameComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }

  protected loadingNumber = 0;

  protected readonly languages$ = this.contentLanguage.languages$.pipe(
    map((contentLanguages) => {
      const languages = new Map<string, ItemLanguage>();

      for (const language of contentLanguages) {
        languages.set(language, {
          fullText: null,
          fullTextId: null,
          language,
          name: null,
          text: null,
          textId: null,
        });
      }

      return languages;
    }),
  );

  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly data$: Observable<{itemId: number; languages: ItemLanguage[]}> = this.item$.pipe(
    switchMap((item) =>
      item
        ? combineLatest([
            of(item.id),
            this.itemsClient.getItemLanguages(new APIGetItemLanguagesRequest({itemId: '' + item.id})),
            this.languages$,
          ])
        : EMPTY,
    ),
    map(([itemId, {items}, languages]) => {
      for (const value of items ? items : []) {
        languages.set(value.language, {
          fullText: value.fullText,
          fullTextId: value.fullTextId === '0' ? null : value.fullTextId,
          language: value.language,
          name: value.name,
          text: value.text,
          textId: value.textId === '0' ? null : value.textId,
        });
      }

      return {
        itemId: itemId,
        languages: Array.from(languages.values()),
      };
    }),
  );

  constructor(
    private readonly api: APIService,
    private readonly contentLanguage: ContentLanguageService,
    private readonly itemsClient: ItemsClient,
  ) {}

  protected saveLanguages(itemId: number, itemLanguages: ItemLanguage[]) {
    for (const language of itemLanguages) {
      this.loadingNumber++;
      this.api
        .request<void>('PUT', 'item/' + itemId + '/language/' + language.language, {
          body: {
            full_text: language.fullText,
            name: language.name,
            text: language.text,
          },
        })
        .subscribe({
          error: () => {
            this.loadingNumber--;
          },
          next: () => {
            this.loadingNumber--;
          },
        });
    }
  }
}
