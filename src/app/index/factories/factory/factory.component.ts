import {Component, Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIIndexFactoriesItem} from '../factories.component';

@Component({
  selector: 'app-index-factories-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
@Injectable()
export class IndexFactoriesFactoryComponent {
  @Input() factory: APIIndexFactoriesItem;
  public loading = true;
  public html = '';

  constructor(private http: HttpClient) {}

  public shown() {
    this.loading = true;

    this.http.get(this.factory.new_url, {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
