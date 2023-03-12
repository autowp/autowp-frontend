import {Component} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {GetTopBrandsListRequest} from '@grpc/spec.pb';
import {LanguageService} from '@services/language';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-index-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class IndexBrandsComponent {
  constructor(private items: ItemsClient, private languageService: LanguageService) {}

  public placeholderItems = Array.from({length: 60}, () => Math.round(3 + Math.random() * 5));

  public result$ = this.items
    .getTopBrandsList(new GetTopBrandsListRequest({language: this.languageService.language}))
    .pipe(
      map((response) => ({
        brands: response.brands,
        more: response.brands ? response.total - response.brands.length : 0,
      }))
    );
}
