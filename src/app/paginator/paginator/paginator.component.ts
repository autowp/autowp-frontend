import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Pages} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  readonly data = input.required<Pages>();

  protected pagesInRange(): number[] {
    return Object.values(this.data().pagesInRange);
  }

  protected padd(page: number): string {
    const size = Math.max(2, this.data().pageCount.toString().length);
    return page.toString().padStart(size, '0');
  }
}
