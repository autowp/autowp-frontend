import {NgStyle} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Spec} from '@grpc/spec.pb';

@Component({
  imports: [NgStyle],
  selector: 'app-info-spec-row',
  templateUrl: './row.component.html',
})
export class InfoSpecRowComponent {
  @Input() row?: Spec;
  @Input() deep = 0;
}
