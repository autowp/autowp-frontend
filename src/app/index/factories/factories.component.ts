import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GetTopFactoriesListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

import {IndexFactoriesFactoryComponent} from './factory/factory.component';

@Component({
  imports: [RouterLink, IndexFactoriesFactoryComponent, AsyncPipe],
  selector: 'app-index-factories',
  templateUrl: './factories.component.html',
})
export class IndexFactoriesComponent {
  private readonly items = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly factories$ = this.items.getTopFactoriesList(
    new GetTopFactoriesListRequest({
      language: this.languageService.language,
    }),
  );
}
