import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GetTopBrandsListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {map} from 'rxjs/operators';

import {IndexBrandsBrandComponent} from './brand/brand.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, IndexBrandsBrandComponent, AsyncPipe],
  selector: 'app-index-brands',
  styleUrls: ['./brands.component.scss'],
  templateUrl: './brands.component.html',
})
export class IndexBrandsComponent {
  readonly #items = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  // eslint-disable-next-line sonarjs/pseudo-random
  protected readonly placeholderItems = Array.from({length: 60}, () => Math.round(3 + Math.random() * 5)).map(
    (item) => ({width: item}),
  );

  protected readonly result$ = this.#items
    .getTopBrandsList(new GetTopBrandsListRequest({language: this.#languageService.language}))
    .pipe(
      map((response) => ({
        brands: response.brands,
        more: response.brands ? response.total - response.brands.length : 0,
      })),
    );
}
