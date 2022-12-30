import {Component, Input} from '@angular/core';
import * as leftPad from 'left-pad';
import {APIPaginator} from '../../services/api.service';
import {Pages} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() data: APIPaginator | Pages;

  public pagesInRange(): number[] {
    return Object.values(this.data.pagesInRange);
  }

  public padd(page: number): string {
    const size = Math.max(2, this.data.pageCount.toString().length);
    return leftPad(page, size, '0');
  }
}
