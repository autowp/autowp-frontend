import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-donate-success',
  templateUrl: './success.component.html',
})
export class DonateSuccessComponent {
  constructor(private readonly pageEnv: PageEnvService) {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
