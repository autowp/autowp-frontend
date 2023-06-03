import {Component, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {APITopCategoriesListItem} from '@grpc/spec.pb';

@Component({
  selector: 'app-index-categories-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class IndexCategoriesCategoryComponent {
  @Input() category: APITopCategoriesListItem;
  protected loading = true;
  protected html = '';

  constructor(private readonly api: APIService) {}

  protected shown() {
    this.loading = true;

    this.api
      .request('GET', 'item/' + this.category.id + '/new-items', {
        responseType: 'text',
        observe: 'body',
      })
      .subscribe((html) => {
        this.html = html;
        this.loading = false;
      });
  }
}
