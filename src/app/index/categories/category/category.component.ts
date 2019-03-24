import {Component, Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIIndexCategoriesItem} from '../categories.component';

@Component({
  selector: 'app-index-categories-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
@Injectable()
export class IndexCategoriesCategoryComponent {
  @Input() category: APIIndexCategoriesItem;
  public loading = true;
  public html = '';

  constructor(private http: HttpClient) {}

  public shown() {
    this.loading = true;

    this.http.get(this.category.new_cars_url, {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
