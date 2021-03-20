import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import { Subscription } from 'rxjs';
import {
  APIPictureModerVoteTemplate,
  APIPictureModerVoteTemplateService
} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';

@Component({
  selector: 'app-moder-picture-vote-templates',
  templateUrl: './picture-vote-templates.component.html'
})
@Injectable()
export class ModerPictureVoteTemplatesComponent implements OnInit, OnDestroy {
  public templates: APIPictureModerVoteTemplate[];
  public vote = -1;
  public name = '';
  private sub: Subscription;

  constructor(
    private voteTemplateService: APIPictureModerVoteTemplateService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: $localize `Picture vote templates`,
          pageId: 212
        }),
      0
    );

    this.sub = this.voteTemplateService
      .getTemplates()
      .subscribe(templates => (this.templates = templates));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public deleteTemplate(template: APIPictureModerVoteTemplate) {
    this.voteTemplateService.deleteTemplate(template.id).subscribe();
  }

  public createTemplate() {
    const template = {
      vote: this.vote,
      name: this.name
    };

    this.voteTemplateService.createTemplate(template).subscribe();
  }
}
