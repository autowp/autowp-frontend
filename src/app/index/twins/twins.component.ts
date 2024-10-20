import {Component, inject} from '@angular/core';
import {GetTopTwinsBrandsListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  selector: 'app-index-twins',
  templateUrl: './twins.component.html',
})
export class IndexTwinsComponent {
  private readonly items = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly items$ = this.items.getTopTwinsBrandsList(
    new GetTopTwinsBrandsListRequest({language: this.languageService.language}),
  );
}
