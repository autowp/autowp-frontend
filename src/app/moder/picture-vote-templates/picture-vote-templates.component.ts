import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {ModerVoteTemplate} from '@grpc/spec.pb';

@Component({
  selector: 'app-moder-picture-vote-templates',
  templateUrl: './picture-vote-templates.component.html',
})
export class ModerPictureVoteTemplatesComponent implements OnInit {
  protected readonly templates$ = this.voteTemplateService.getTemplates$();
  protected vote = -1;
  protected name = '';

  constructor(
    private readonly voteTemplateService: APIPictureModerVoteTemplateService,
    private readonly pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 212,
        }),
      0
    );
  }

  protected deleteTemplate(template: ModerVoteTemplate) {
    this.voteTemplateService.deleteTemplate$(template.id).subscribe();
  }

  protected createTemplate() {
    this.voteTemplateService
      .createTemplate$({
        vote: this.vote,
        name: this.name,
      })
      .subscribe();
  }
}
