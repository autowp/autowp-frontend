import type {APIItem} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {APIGetItemLanguagesRequest, ItemLanguage} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavLinkBase, NgbNavOutlet} from '@ng-bootstrap/ng-bootstrap';
import {ContentLanguageService} from '@services/content-language';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {MarkdownEditComponent} from '../../../../markdown-edit/markdown-edit/markdown-edit.component';

@Component({
  imports: [
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavLinkBase,
    NgbNavContent,
    FormsModule,
    MarkdownEditComponent,
    RouterLink,
    NgbNavOutlet,
    AsyncPipe,
  ],
  selector: 'app-moder-items-item-name',
  templateUrl: './name.component.html',
})
export class ModerItemsItemNameComponent {
  private readonly contentLanguage = inject(ContentLanguageService);
  private readonly itemsClient = inject(ItemsClient);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }

  protected loadingNumber = 0;

  protected readonly languages$ = this.contentLanguage.languages$.pipe(
    map((contentLanguages) => {
      const languages = new Map<string, ItemLanguage>();

      for (const language of contentLanguages) {
        languages.set(
          language,
          new ItemLanguage({
            fullText: '',
            fullTextId: 0,
            language,
            name: '',
            text: '',
            textId: 0,
          }),
        );
      }

      return languages;
    }),
  );

  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected readonly data$: Observable<ItemLanguage[]> = this.item$.pipe(
    switchMap((item) =>
      item
        ? combineLatest([
            of(item.id + ''),
            this.itemsClient.getItemLanguages(new APIGetItemLanguagesRequest({itemId: '' + item.id})),
            this.languages$,
          ])
        : EMPTY,
    ),
    map(([itemId, {items}, languages]) => {
      languages.forEach((language) => {
        language.itemId = itemId;
      });

      for (const value of items ? items : []) {
        languages.set(value.language, value);
      }

      return Array.from(languages.values());
    }),
  );

  protected saveLanguages(itemLanguages: ItemLanguage[]) {
    for (const itemLanguage of itemLanguages) {
      this.loadingNumber++;
      this.itemsClient.updateItemLanguage(itemLanguage).subscribe({
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
