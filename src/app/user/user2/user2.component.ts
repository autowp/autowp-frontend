import {Component, Input} from '@angular/core';
import {APIUser} from '@grpc/spec.pb';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
})
export class User2Component {
  @Input() user: APIUser;
}
