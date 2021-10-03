import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ItemsClient} from '../../../../generated/spec.pbsc';
import {APITopBrandsListItem, GetTopBrandsListRequest} from '../../../../generated/spec.pb';
import {LanguageService} from '../../services/language';

@Component({
  selector: 'app-index-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class IndexBrandsComponent implements OnInit, OnDestroy {
  public more = 0;
  private sub: Subscription;
  private language: string;
  public brands: APITopBrandsListItem[];

  constructor(private items: ItemsClient, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.language = this.languageService.language;
    this.sub = this.items.getTopBrandsList(new GetTopBrandsListRequest({language: this.language})).subscribe(response => {
      this.brands = response.brands;
      this.more = this.brands ? response.total - this.brands.length : 0;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
