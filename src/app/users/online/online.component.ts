import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UsersClient} from '@grpc/spec.pbsc';
import {APIUser, APIUsersRequest} from '@grpc/spec.pb';

@Component({
  selector: 'app-users-online',
  templateUrl: './online.component.html',
})
export class UsersOnlineComponent {
  private reload$ = new BehaviorSubject<boolean>(true);
  public users$: Observable<APIUser[]> = this.reload$.pipe(
    switchMap(() => this.usersClient.getUsers(new APIUsersRequest({isOnline: true}))),
    map((response) => response.items)
  );

  constructor(public readonly activeModal: NgbActiveModal, private readonly usersClient: UsersClient) {}

  public load() {
    this.reload$.next(true);
  }
}
