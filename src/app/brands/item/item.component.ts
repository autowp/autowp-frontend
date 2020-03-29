import { Component, Injectable, Input } from '@angular/core';
import { APIBrandsIconsResponse, APIBrandsBrand } from '../../services/brands.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-brands-item',
  templateUrl: './item.component.html'
})
@Injectable()
export class BrandsItemComponent {
  @Input() brand: APIBrandsBrand;
  @Input() icons: APIBrandsIconsResponse;

  public loading = false;
  public html: string;

  constructor(private api: APIService) {}

  public cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }

  public shown() {
    this.loading = true;

    this.api.get('brands/' + this.brand.id + '/new-items', {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
