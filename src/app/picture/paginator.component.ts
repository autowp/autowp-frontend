import { Component, Input } from '@angular/core';
import { APIPicturePaginator } from '../services/picture';
import * as leftPad from 'left-pad';

@Component({
  selector: 'app-picture-paginator',
  templateUrl: './paginator.component.html'
})
export class PicturePaginatorComponent {
  @Input() paginator: APIPicturePaginator;
  @Input() prefix: string[] = [];

  public format(page, count) {
    const size = Math.max(2, count.toString().length);

    return leftPad(page, size, '0');
  }
}
