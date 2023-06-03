import {Component, Input} from '@angular/core';
import {APIPaginator} from '@services/api.service';
import {Pages} from '@grpc/spec.pb';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() data: APIPaginator | Pages;

  protected pagesInRange(): number[] {
    return Object.values(this.data.pagesInRange);
  }

  protected padd(page: number): string {
    const size = Math.max(2, this.data.pageCount.toString().length);
    return page.toString().padStart(size, '0');
  }
}
