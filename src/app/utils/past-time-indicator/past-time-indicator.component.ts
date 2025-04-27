import {DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TimeAgoPipe} from '@utils/time-ago.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbTooltip, DatePipe, TimeAgoPipe],
  selector: 'app-past-time-indicator',
  styleUrls: ['./styles.scss'],
  templateUrl: './past-time-indicator.component.html',
})
export class PastTimeIndicatorComponent {
  readonly date = input.required<Date | string>();

  protected readonly past = computed(() => {
    const date = this.date();
    return (date ? new Date(date) : new Date()).getTime() < new Date().getTime() - 86400 * 1000;
  });
}
