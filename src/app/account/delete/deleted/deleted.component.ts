import {Component} from '@angular/core';
import {PageEnvService} from '../../../services/page-env.service';

@Component({
  selector: 'app-account-delete-deleted',
  templateUrl: './deleted.component.html',
})
export class AccountDeletedComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(() => this.pageEnv.set({pageId: 93}), 0);
  }
}
