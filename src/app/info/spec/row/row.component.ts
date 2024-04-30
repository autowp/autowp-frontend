import {Component, Input} from '@angular/core';
import {Spec} from '@grpc/spec.pb';

@Component({
  selector: 'app-info-spec-row',
  templateUrl: './row.component.html',
})
export class InfoSpecRowComponent {
  @Input() row?: Spec;
  @Input() deep: number = 0;
}
