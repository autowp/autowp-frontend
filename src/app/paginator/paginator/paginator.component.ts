import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Pages} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() data?: Pages;

  protected pagesInRange(): number[] {
    return this.data ? Object.values(this.data.pagesInRange) : [];
  }

  protected padd(page: number): string {
    const size = this.data ? Math.max(2, this.data.pageCount.toString().length) : 1;
    return page.toString().padStart(size, '0');
  }
}
