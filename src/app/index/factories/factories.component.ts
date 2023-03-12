import {Component} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {GetTopFactoriesListRequest} from '@grpc/spec.pb';
import {LanguageService} from '@services/language';

@Component({
  selector: 'app-index-factories',
  templateUrl: './factories.component.html',
})
export class IndexFactoriesComponent {
  public factories$ = this.items.getTopFactoriesList(
    new GetTopFactoriesListRequest({
      language: this.languageService.language,
    })
  );

  constructor(private items: ItemsClient, private languageService: LanguageService) {}
}
