import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
  selector: 'app-account-delete-deleted',
  templateUrl: './deleted.component.html',
})
export class AccountDeletedComponent implements OnInit {
  readonly #pageEnv = inject(PageEnvService);

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 93}), 0);
  }
}
