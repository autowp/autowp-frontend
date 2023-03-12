import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
})
export class RulesComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(() => this.pageEnv.set({pageId: 106}), 0);
  }
}
