import {Component, Input} from '@angular/core';
import {APIService} from '@services/api.service';
import {APITopFactoriesListItem} from '@grpc/spec.pb';

@Component({
  selector: 'app-index-factories-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
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
        responseType: 'text',
        observe: 'body',
      })
      .subscribe((html) => {
        this.html = html;
        this.loading = false;
      });
  }
}
