import {Component, Input} from '@angular/core';
import {APIItem} from '@services/item';
import {APIItemLanguage, ItemLanguageService} from '@services/item-language';
import {ContentLanguageService} from '@services/content-language';
import {combineLatest, BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-moder-items-item-name',
  templateUrl: './name.component.html',
})
export class ModerItemsItemNameComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }

  public loadingNumber = 0;

  public languages$ = this.contentLanguage.languages$.pipe(
    map((contentLanguages) => {
      const languages = new Map<string, APIItemLanguage>();

      for (const language of contentLanguages) {
        languages.set(language, {
          language,
          name: null,
          text: null,
          full_text: null,
          text_id: null,
          full_text_id: null,
        });
      }

      return languages;
    })
  );

  private item$ = new BehaviorSubject<APIItem>(null);

  public data$: Observable<{itemId: number; languages: APIItemLanguage[]}> = this.item$.pipe(
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
    private api: APIService,
    private itemLanguageService: ItemLanguageService,
    private contentLanguage: ContentLanguageService
  ) {}

  public saveLanguages(itemId: number, itemLanguages: APIItemLanguage[]) {
    for (const language of itemLanguages) {
      this.loadingNumber++;
      this.api
        .request<void>('PUT', 'item/' + itemId + '/language/' + language.language, {
          body: {
            name: language.name,
            text: language.text,
            full_text: language.full_text,
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
