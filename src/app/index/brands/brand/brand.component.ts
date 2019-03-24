import {Component, Injectable, Input} from '@angular/core';
import {APIIndexBrandsBrand} from '../brands.component';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  public shown() {
    this.loading = true;

    this.http.get(this.brand.new_cars_url, {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
