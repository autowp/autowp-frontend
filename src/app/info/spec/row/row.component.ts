import {NgStyle} from '@angular/common';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Spec} from '@grpc/spec.pb';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle],
  selector: 'app-info-spec-row',
  templateUrl: './row.component.html',
})
export class InfoSpecRowComponent {
  readonly row = input.required<Spec>();
  readonly deep = input.required<number>();
}
