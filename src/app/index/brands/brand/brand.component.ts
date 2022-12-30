import {Component, Input} from '@angular/core';
import {APIService} from '../../../services/api.service';
import {APITopBrandsListItem} from '../../../../../generated/spec.pb';

@Component({
  selector: 'app-index-brands-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class IndexBrandsBrandComponent {
  @Input() brand: APITopBrandsListItem;
  public loading = true;
  public html = '';

  constructor(private api: APIService) {}

  public shown() {
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
