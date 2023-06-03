import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {APIPictureModerVoteTemplateService} from '../../../api/picture-moder-vote-template/picture-moder-vote-template.service';

@Component({
  selector: 'app-picture-moder-vote-modal',
  templateUrl: './modal.component.html',
})
export class PictureModerVoteModalComponent {
  @Input() pictureId: number;
  @Input() vote: number;
  @Output() voted = new EventEmitter();

  protected reason = '';
  protected save = false;

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly templateService: APIPictureModerVoteTemplateService,
    private readonly moderVoteService: PictureModerVoteService
  ) {}

  protected ok() {
    if (this.save) {
      this.templateService
        .createTemplate$({
          vote: this.vote,
          name: this.reason,
        })
        .subscribe();
    }

    this.moderVoteService.vote$(this.pictureId, this.vote, this.reason).subscribe(() => this.voted.emit());

    this.activeModal.close();
  }
}
