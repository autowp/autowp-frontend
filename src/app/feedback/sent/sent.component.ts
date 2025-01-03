import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  imports: [RouterLink, MarkdownComponent],
  selector: 'app-feedback-sent',
  templateUrl: './sent.component.html',
})
export class FeedbackSentComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 93}), 0);
  }
}
