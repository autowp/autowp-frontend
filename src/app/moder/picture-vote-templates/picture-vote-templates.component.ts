import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ModerVoteTemplate} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';

import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';

@Component({
  imports: [RouterLink, FormsModule, AsyncPipe],
  selector: 'app-moder-picture-vote-templates',
  templateUrl: './picture-vote-templates.component.html',
})
export class ModerPictureVoteTemplatesComponent implements OnInit {
  private readonly voteTemplateService = inject(APIPictureModerVoteTemplateService);
  private readonly pageEnv = inject(PageEnvService);

  protected readonly templates$ = this.voteTemplateService.getTemplates$();
  protected vote = -1;
  protected name = '';

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 212,
        }),
      0,
    );
  }

  protected deleteTemplate(template: ModerVoteTemplate) {
    this.voteTemplateService.deleteTemplate$(template.id).subscribe();
  }

  protected createTemplate() {
    this.voteTemplateService
      .createTemplate$({
        name: this.name,
        vote: this.vote,
      })
      .subscribe();
  }
}
