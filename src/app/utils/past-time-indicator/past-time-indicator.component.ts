import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-past-time-indicator',
  styleUrls: ['./styles.scss'],
  templateUrl: './past-time-indicator.component.html',
})
export class PastTimeIndicatorComponent {
  @Input() set date(value: Date | string) {
    this.date$.next(value);
  }
  protected readonly date$ = new BehaviorSubject<Date | string>(null);
  protected readonly past$ = this.date$.pipe(
    map((date) => ({past: new Date(date).getTime() < new Date().getTime() - 86400 * 1000})),
  );
}
