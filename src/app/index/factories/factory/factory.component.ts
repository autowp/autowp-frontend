import {Component, Input} from '@angular/core';
import {APITopFactoriesListItem} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-index-factories-factory',
  styleUrls: ['./factory.component.scss'],
  templateUrl: './factory.component.html',
})
export class IndexFactoriesFactoryComponent {
  @Input() factory: APITopFactoriesListItem;
  protected loading = true;
  protected html = '';

  constructor(private readonly api: APIService) {}

  protected shown() {
    this.loading = true;

    this.api
      .request('GET', 'item/' + this.factory.id + '/new-items', {
        observe: 'body',
        responseType: 'text',
      })
      .subscribe((html) => {
        this.html = html;
        this.loading = false;
      });
  }
}
