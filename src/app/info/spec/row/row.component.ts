import { Component, Input } from '@angular/core';
import { APISpec } from '../../../services/spec';

@Component({
  selector: 'app-info-spec-row',
  templateUrl: './row.component.html'
})
export class InfoSpecRowComponent {
  @Input() row: APISpec;
  @Input() deep: number;

}
