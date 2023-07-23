import {Component, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {ContentLanguageService} from '@services/content-language';
import {APIItem} from '@services/item';
import {APIItemLanguage, ItemLanguageService} from '@services/item-language';
import {BehaviorSubject, Observable, combineLatest, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

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
      const languages = new Map<string, APIItemLanguage>();

      for (const language of contentLanguages) {
        languages.set(language, {
          full_text: null,
          full_text_id: null,
          language,
          name: null,
          text: null,
          text_id: null,
        });
      }

      return languages;
    })
  );

  protected readonly item$ = new BehaviorSubject<APIItem>(null);

  protected readonly data$: Observable<{itemId: number; languages: APIItemLanguage[]}> = this.item$.pipe(
    switchMap((item) => combineLatest([of(item.id), this.itemLanguageService.getItems$(item.id), this.languages$])),
    map(([itemId, {items}, languages]) => {
      for (const value of items) {
        languages.set(value.language, value);
      }

      return {
        itemId: itemId,
        languages: Array.from(languages.values()),
      };
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly itemLanguageService: ItemLanguageService,
    private readonly contentLanguage: ContentLanguageService
  ) {}

  protected saveLanguages(itemId: number, itemLanguages: APIItemLanguage[]) {
    for (const language of itemLanguages) {
      this.loadingNumber++;
      this.api
        .request<void>('PUT', 'item/' + itemId + '/language/' + language.language, {
          body: {
            full_text: language.full_text,
            name: language.name,
            text: language.text,
          },
        })
        .subscribe(
          () => {
            this.loadingNumber--;
          },
          () => {
            this.loadingNumber--;
          }
        );
    }
  }
}
