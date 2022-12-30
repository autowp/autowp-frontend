import {Component} from '@angular/core';
import {ItemsClient} from '../../../../generated/spec.pbsc';
import {GetTopBrandsListRequest} from '../../../../generated/spec.pb';
import {LanguageService} from '../../services/language';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-index-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class IndexBrandsComponent {
  constructor(private items: ItemsClient, private languageService: LanguageService) {}

  public result$ = this.items
    .getTopBrandsList(new GetTopBrandsListRequest({language: this.languageService.language}))
    .pipe(
      map((response) => ({
        brands: response.brands,
        more: response.brands ? response.total - response.brands.length : 0,
      }))
    );
}
