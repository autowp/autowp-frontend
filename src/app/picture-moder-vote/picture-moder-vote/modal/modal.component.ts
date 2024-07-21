import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PictureModerVoteService} from '@services/picture-moder-vote';

import {APIPictureModerVoteTemplateService} from '../../../api/picture-moder-vote-template/picture-moder-vote-template.service';

@Component({
  selector: 'app-picture-moder-vote-modal',
  templateUrl: './modal.component.html',
})
export class PictureModerVoteModalComponent {
  @Input() pictureId?: number;
  @Input() vote: number = 0;
  @Output() voted = new EventEmitter();

  protected reason = '';
  protected save = false;

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly templateService: APIPictureModerVoteTemplateService,
    private readonly moderVoteService: PictureModerVoteService,
  ) {}

  protected ok() {
    if (this.save) {
      this.vote &&
        this.templateService
          .createTemplate$({
            name: this.reason,
            vote: this.vote,
          })
          .subscribe();
    }

    this.pictureId &&
      this.vote &&
      this.moderVoteService.vote$('' + this.pictureId, this.vote, this.reason).subscribe(() => this.voted.emit());

    this.activeModal.close();
  }
}
