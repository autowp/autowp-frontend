import {Component} from '@angular/core';
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
export class IndexCategoriesComponent {
  constructor(private api: APIService) {}

  public result$ = this.api.request<APIIndexCategoriesResponse>('GET', 'index/categories');
}
