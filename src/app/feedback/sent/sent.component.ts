import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-feedback-sent',
  templateUrl: './sent.component.html',
})
export class FeedbackSentComponent implements OnInit {
  constructor(private readonly pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 93}), 0);
  }
}
