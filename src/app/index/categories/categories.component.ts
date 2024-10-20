import {Component, inject} from '@angular/core';
import {GetTopCategoriesListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
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
