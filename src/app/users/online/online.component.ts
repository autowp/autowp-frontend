import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {APIUser, APIUsersRequest} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {UserComponent} from '../../user/user/user.component';

@Component({
  imports: [UserComponent, AsyncPipe],
  selector: 'app-users-online',
  templateUrl: './online.component.html',
})
export class UsersOnlineComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  private readonly usersClient = inject(UsersClient);

  private readonly reload$ = new BehaviorSubject<void>(void 0);
  protected readonly users$: Observable<APIUser[]> = this.reload$.pipe(
    switchMap(() => this.usersClient.getUsers(new APIUsersRequest({isOnline: true}))),
    map((response) => (response.items ? response.items : [])),
  );

  protected load() {
    this.reload$.next();
  }
}
