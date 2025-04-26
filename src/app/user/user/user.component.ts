import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIUser} from '@grpc/spec.pb';

@Component({
  imports: [RouterLink],
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  readonly user = input.required<APIUser>();
}
