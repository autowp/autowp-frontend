import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIPicturePaginator} from '@services/picture';

@Component({
  imports: [RouterLink],
  selector: 'app-picture-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
})
export class PicturePaginatorComponent {
  @Input() paginator: APIPicturePaginator | null | undefined = null;
  @Input() prefix: string[] = [];

  protected format(page: number, count: number) {
    const size = Math.max(2, count.toString().length);

    return page.toString().padStart(size, '0');
  }
}
