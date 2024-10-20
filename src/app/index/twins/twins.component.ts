import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GetTopTwinsBrandsListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

import {MarkdownComponent} from '../../utils/markdown/markdown.component';

@Component({
  imports: [RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-index-twins',
  standalone: true,
  templateUrl: './twins.component.html',
})
export class IndexTwinsComponent {
  private readonly items = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly items$ = this.items.getTopTwinsBrandsList(
    new GetTopTwinsBrandsListRequest({language: this.languageService.language}),
  );
}
