import {Component} from '@angular/core';
import {GetTopCategoriesListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  selector: 'app-index-categories',
  templateUrl: './categories.component.html',
})
export class IndexCategoriesComponent {
  constructor(private readonly items: ItemsClient, private readonly languageService: LanguageService) {}

  protected readonly result$ = this.items.getTopCategoriesList(
    new GetTopCategoriesListRequest({
      language: this.languageService.language,
    })
  );
}
