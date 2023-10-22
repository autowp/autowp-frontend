import {Component} from '@angular/core';
import {GetTopBrandsListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-index-brands',
  styleUrls: ['./brands.component.scss'],
  templateUrl: './brands.component.html',
})
export class IndexBrandsComponent {
  constructor(
    private readonly items: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected readonly placeholderItems = Array.from({length: 60}, () => Math.round(3 + Math.random() * 5));

  protected readonly result$ = this.items
    .getTopBrandsList(new GetTopBrandsListRequest({language: this.languageService.language}))
    .pipe(
      map((response) => ({
        brands: response.brands,
        more: response.brands ? response.total - response.brands.length : 0,
      })),
    );
}
