import {Component, Input} from '@angular/core';
import {APITopCategoriesListItem} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-index-categories-category',
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
})
export class IndexCategoriesCategoryComponent {
  @Input() category?: APITopCategoriesListItem;
  protected loading = true;
  protected html = '';

  constructor(private readonly api: APIService) {}

  protected shown() {
    this.loading = true;

    this.category &&
      this.api
        .request('GET', 'item/' + this.category.id + '/new-items', {
          observe: 'body',
          responseType: 'text',
        })
        .subscribe((html) => {
          this.html = html;
          this.loading = false;
        });
  }
}
