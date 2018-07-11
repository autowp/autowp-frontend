import { Component, Injectable, Input } from '@angular/core';
import { APIBrandsIconsResponse, APIBrandsBrand } from '../../services/brands.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  public cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }

  public shown() {
    this.loading = true;

    this.http.get(this.brand.new_cars_url, {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      console.log('html', html);
      this.html = html;
      this.loading = false;
    });
  }
}
