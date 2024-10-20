import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  imports: [NgbTooltip, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-past-time-indicator',
  standalone: true,
  styleUrls: ['./styles.scss'],
  templateUrl: './past-time-indicator.component.html',
})
export class PastTimeIndicatorComponent {
  @Input() set date(value: Date | string) {
    this.date$.next(value);
  }
  protected readonly date$ = new BehaviorSubject<Date | null | string>(null);
  protected readonly past$ = this.date$.pipe(
    map((date) => ({past: (date ? new Date(date) : new Date()).getTime() < new Date().getTime() - 86400 * 1000})),
  );
}
