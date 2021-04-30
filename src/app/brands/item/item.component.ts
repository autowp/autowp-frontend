import { Component, Input } from '@angular/core';
import { APIBrandsBrand } from '../../services/brands.service';
import { APIService } from '../../services/api.service';
import {BrandIcons} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-brands-item',
  templateUrl: './item.component.html'
})
export class BrandsItemComponent {
  @Input() brand: APIBrandsBrand;
  @Input() icons: BrandIcons;

  public loading = false;
  public html: string;

  constructor(private api: APIService) {}

  public cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }

  public shown() {
    this.loading = true;

    this.api.request('GET', 'brands/' + this.brand.id + '/new-items', {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
