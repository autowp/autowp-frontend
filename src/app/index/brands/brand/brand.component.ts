import {Component, Input} from '@angular/core';
import {APITopBrandsListItem} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-index-brands-brand',
  styleUrls: ['./brand.component.scss'],
  templateUrl: './brand.component.html',
})
export class IndexBrandsBrandComponent {
  @Input() brand?: APITopBrandsListItem;
  protected loading = true;
  protected html = '';

  constructor(private readonly api: APIService) {}

  protected shown() {
    this.loading = true;

    this.brand &&
      this.api
        .request('GET', 'brands/' + this.brand.id + '/new-items', {
          observe: 'body',
          responseType: 'text',
        })
        .subscribe((html) => {
          this.html = html;
          this.loading = false;
        });
  }
}
