import {Component} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {GetTopCategoriesListRequest} from '@grpc/spec.pb';
import {LanguageService} from '../../services/language';

@Component({
  selector: 'app-index-categories',
  templateUrl: './categories.component.html',
})
export class IndexCategoriesComponent {
  constructor(private items: ItemsClient, private languageService: LanguageService) {}

  public result$ = this.items.getTopCategoriesList(
    new GetTopCategoriesListRequest({
      language: this.languageService.language,
    })
  );
}
