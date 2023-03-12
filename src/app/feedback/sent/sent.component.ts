import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-feedback-sent',
  templateUrl: './sent.component.html',
})
export class FeedbackSentComponent {
  constructor(private pageEnv: PageEnvService) {
    setTimeout(() => this.pageEnv.set({pageId: 93}), 0);
  }
}
