import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APIUser } from '../../services/user';
import { APIService } from '../../services/api.service';

interface Response {
  items: APIUser[];
}

@Component({
  selector: 'app-users-online',
  templateUrl: './online.component.html'
})
export class UsersOnlineComponent implements OnInit {
  public users: APIUser[] = [];

  constructor(public activeModal: NgbActiveModal, private api: APIService) {}

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this.api
      .request<Response>('GET', 'user/online')
      .subscribe(response => (this.users = response.items));

    return false;
  }
}
