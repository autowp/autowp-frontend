import {Component, Injectable, Input} from '@angular/core';
import {APIIndexBrandsBrand} from '../brands.component';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-index-brands-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
@Injectable()
export class IndexBrandsBrandComponent {
  @Input() brand: APIIndexBrandsBrand;
  public loading = true;
  public html = '';

  constructor(private api: APIService) {}

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
