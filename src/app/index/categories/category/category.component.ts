import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APITopCategoriesListItem, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  imports: [RouterLink, NgbPopover, AsyncPipe],
  selector: 'app-index-categories-category',
  standalone: true,
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
})
export class IndexCategoriesCategoryComponent {
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set category(category: APITopCategoriesListItem) {
    this.category$.next(category);
  }
  protected readonly category$ = new BehaviorSubject<APITopCategoriesListItem | null>(null);

  protected readonly response$ = this.category$.pipe(
    switchMap((category) =>
      category
        ? this.itemsClient.getNewItems(
            new NewItemsRequest({
              itemId: '' + category.id,
              language: this.languageService.language,
            }),
          )
        : EMPTY,
    ),
  );
}
