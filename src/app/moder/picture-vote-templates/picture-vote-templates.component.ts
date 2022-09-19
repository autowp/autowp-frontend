import { Component, OnInit} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {ModerVoteTemplate} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-moder-picture-vote-templates',
  templateUrl: './picture-vote-templates.component.html'
})
export class ModerPictureVoteTemplatesComponent implements OnInit {
  public templates$ = this.voteTemplateService.getTemplates();
  public vote = -1;
  public name = '';

  constructor(
    private voteTemplateService: APIPictureModerVoteTemplateService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 212
        }),
      0
    );
  }

  public deleteTemplate(template: ModerVoteTemplate) {
    this.voteTemplateService.deleteTemplate(template.id).subscribe();
  }

  public createTemplate() {
    this.voteTemplateService.createTemplate({
      vote: this.vote,
      name: this.name
    }).subscribe();
  }
}
