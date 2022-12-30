import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIUser} from '../../services/user';
import {APIService} from '../../services/api.service';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

interface Response {
  items: APIUser[];
}

@Component({
  selector: 'app-users-online',
  templateUrl: './online.component.html',
})
export class UsersOnlineComponent {
  private reload$ = new BehaviorSubject<boolean>(true);
  public users$ = this.reload$.pipe(
    switchMap(() => this.api.request<Response>('GET', 'user/online')),
    map((response) => response.items)
  );

  constructor(public activeModal: NgbActiveModal, private api: APIService) {}

  public load() {
    this.reload$.next(true);
  }
}
