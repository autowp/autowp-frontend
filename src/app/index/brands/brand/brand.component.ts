import {Component, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {APITopBrandsListItem} from '@grpc/spec.pb';

@Component({
  selector: 'app-index-brands-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class IndexBrandsBrandComponent {
  @Input() brand: APITopBrandsListItem;
  protected loading = true;
  protected html = '';

  constructor(private readonly api: APIService) {}

  protected shown() {
    this.loading = true;

    this.api
      .request('GET', 'brands/' + this.brand.id + '/new-items', {
        responseType: 'text',
        observe: 'body',
      })
      .subscribe((html) => {
        this.html = html;
        this.loading = false;
      });
  }
}
