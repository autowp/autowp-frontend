import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../../services/language';
import {Subscription} from 'rxjs';
import { APIService } from '../../services/api.service';

export interface APIIndexCategoriesItem {
  id: number;
  catname: string;
  short_name: string;
  new_cars_count: number;
  cars_count: number;
}

interface APIIndexCategoriesResponse {
  items: APIIndexCategoriesItem[];
}

@Component({
  selector: 'app-index-categories',
  templateUrl: './categories.component.html'
})
@Injectable()
export class IndexCategoriesComponent implements OnInit, OnDestroy {
  public language: string;
  public categories: APIIndexCategoriesItem[];
  private sub: Subscription;

  constructor(private languageService: LanguageService, private api: APIService) {}

  ngOnInit(): void {
    this.language = this.languageService.language;

    this.sub = this.api.request<APIIndexCategoriesResponse>('GET', 'index/categories').subscribe(response => {
      this.categories = response.items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
