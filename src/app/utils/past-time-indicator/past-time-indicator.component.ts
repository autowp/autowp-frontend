import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-past-time-indicator',
  templateUrl: './past-time-indicator.component.html',
  styleUrls: ['./styles.scss']
})
export class PastTimeIndicatorComponent implements OnChanges {
  @Input() date: string|Date;
  past: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) {
      this.past = new Date(this.date).getTime() < new Date().getTime() - 86400 * 1000;
    }
  }
}

