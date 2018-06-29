import { Component, Injectable, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { APIUser } from '../../services/user';

interface Response {
  items: APIUser[];
}

@Component({
  selector: 'app-users-online',
  templateUrl: './online.component.html'
})
@Injectable()
export class UsersOnlineComponent implements OnInit {
  public users: APIUser[] = [];

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this.http
      .get<Response>('/api/user/online')
      .subscribe(response => (this.users = response.items));

    return false;
  }
}
