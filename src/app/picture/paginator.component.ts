import {Component, Input} from '@angular/core';
import {APIPicturePaginator} from '@services/picture';

@Component({
  selector: 'app-picture-paginator',
  templateUrl: './paginator.component.html',
})
export class PicturePaginatorComponent {
  @Input() paginator: APIPicturePaginator;
  @Input() prefix: string[] = [];

  protected format(page, count) {
    const size = Math.max(2, count.toString().length);

    return page.toString().padStart(size, '0');
  }
}
