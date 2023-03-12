import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
})
export class PolicyComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);
  }
}
