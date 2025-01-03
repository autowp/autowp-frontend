import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GetTopCategoriesListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {Markdown2Component} from '@utils/markdown2/markdown2.component';

import {IndexCategoriesCategoryComponent} from './category/category.component';

@Component({
  imports: [RouterLink, IndexCategoriesCategoryComponent, Markdown2Component, AsyncPipe],
  selector: 'app-index-categories',
  templateUrl: './categories.component.html',
})
export class IndexCategoriesComponent {
  private readonly items = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly result$ = this.items.getTopCategoriesList(
    new GetTopCategoriesListRequest({
      language: this.languageService.language,
    }),
  );
}
