import {Component} from '@angular/core';
import {ItemsClient} from '../../../../generated/spec.pbsc';
import {GetTopFactoriesListRequest} from '../../../../generated/spec.pb';
import {LanguageService} from '../../services/language';

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
