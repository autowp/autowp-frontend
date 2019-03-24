import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from '../../services/language';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

export interface APIIndexCategoriesItem {
  catname: string;
  short_name: string;
  new_cars_count: number;
  cars_count: number;
  new_cars_url: string;
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

  constructor(private languageService: LanguageService, private http: HttpClient) {}

  ngOnInit(): void {
    this.language =  this.languageService.getLanguage();

    this.sub = this.http.get<APIIndexCategoriesResponse>('/api/index/categories').subscribe(response => {
      this.categories = response.items;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
