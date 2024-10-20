import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';

import {MarkdownComponent} from '../../../utils/markdown/markdown.component';

@Component({
  imports: [RouterLink, MarkdownComponent],
  selector: 'app-donate-vod-success',
  standalone: true,
  templateUrl: './success.component.html',
})
export class DonateVodSuccessComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
