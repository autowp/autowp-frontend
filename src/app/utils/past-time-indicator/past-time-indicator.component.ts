import {Component, Input} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-past-time-indicator',
  templateUrl: './past-time-indicator.component.html',
  styleUrls: ['./styles.scss'],
})
export class PastTimeIndicatorComponent {
  @Input() set date(value: string | Date) {
    this.date$.next(value);
  }
  protected readonly date$ = new BehaviorSubject<string | Date>(null);
  protected readonly past$ = this.date$.pipe(
    map((date) => ({past: new Date(date).getTime() < new Date().getTime() - 86400 * 1000}))
  );
}
