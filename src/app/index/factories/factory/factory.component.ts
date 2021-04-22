import {Component, Input} from '@angular/core';
import {APIIndexFactoriesItem} from '../factories.component';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-index-factories-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class IndexFactoriesFactoryComponent {
  @Input() factory: APIIndexFactoriesItem;
  public loading = true;
  public html = '';

  constructor(private api: APIService) {}

  public shown() {
    this.loading = true;

    this.api.request('GET', 'item/' + this.factory.id + '/new-items', {
      responseType: 'text',
      observe: 'body'
    }).subscribe(html => {
      this.html = html;
      this.loading = false;
    });
  }
}
