import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsClient} from '../../../../generated/spec.pbsc';
import {APITopFactoriesList, GetTopFactoriesListRequest} from '../../../../generated/spec.pb';
import {LanguageService} from '../../services/language';

@Component({
  selector: 'app-index-factories',
  templateUrl: './factories.component.html'
})
export class IndexFactoriesComponent implements  OnInit {
  public factories$: Observable<APITopFactoriesList>;

  constructor(private items: ItemsClient, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.factories$ = this.items.getTopFactoriesList(new GetTopFactoriesListRequest({
      language: this.languageService.language
    }))
  }
}
