import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-account-delete-deleted',
  templateUrl: './deleted.component.html',
})
export class AccountDeletedComponent implements OnInit {
  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 93}), 0);
  }
}
