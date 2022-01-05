import {Component} from '@angular/core';
import {ItemsClient} from '../../../../generated/spec.pbsc';
import {GetTopTwinsBrandsListRequest} from '../../../../generated/spec.pb';
import {LanguageService} from '../../services/language';

@Component({
  selector: 'app-index-twins',
  templateUrl: './twins.component.html'
})
export class IndexTwinsComponent {
  public items$ = this.items.getTopTwinsBrandsList(new GetTopTwinsBrandsListRequest({language: this.languageService.language}))

  constructor(private items: ItemsClient, private languageService: LanguageService) {}
}
