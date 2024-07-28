import {Component, Input} from '@angular/core';
import {APIUser} from '@grpc/spec.pb';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() user: APIUser | null = null;
}
