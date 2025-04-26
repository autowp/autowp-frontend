import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {map} from 'rxjs/operators';

@Component({
  imports: [NgbTooltip, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-past-time-indicator',
  styleUrls: ['./styles.scss'],
  templateUrl: './past-time-indicator.component.html',
})
export class PastTimeIndicatorComponent {
  readonly date = input.required<Date | string>();
  protected readonly date$ = toObservable(this.date);

  protected readonly past$ = this.date$.pipe(
    map((date) => ({past: (date ? new Date(date) : new Date()).getTime() < new Date().getTime() - 86400 * 1000})),
  );
}
