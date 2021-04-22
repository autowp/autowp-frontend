import {Component, Input} from '@angular/core';
import {APIIndexCategoriesItem} from '../categories.component';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-index-categories-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class IndexCategoriesCategoryComponent {
  @Input() category: APIIndexCategoriesItem;
  public loading = true;
  public html = '';

  constructor(private api: APIService) {}

  public shown() {
    this.loading = true;

    this.api.request('GET', 'item/' + this.category.id + '/new-items', {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
