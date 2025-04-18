import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PictureModerVoteService} from '@services/picture-moder-vote';

import {APIPictureModerVoteTemplateService} from '../../../api/picture-moder-vote-template/picture-moder-vote-template.service';

@Component({
  imports: [FormsModule],
  selector: 'app-picture-moder-vote-modal',
  templateUrl: './modal.component.html',
})
export class PictureModerVoteModalComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  readonly #templateService = inject(APIPictureModerVoteTemplateService);
  readonly #moderVoteService = inject(PictureModerVoteService);

  @Input() pictureId?: string;
  @Input() vote: number = 0;
  @Output() voted = new EventEmitter();

  protected reason = '';
  protected save = false;

  protected ok() {
    if (this.save && this.vote) {
      this.#templateService
        .createTemplate$({
          name: this.reason,
          vote: this.vote,
        })
        .subscribe();
    }

    if (this.pictureId && this.vote) {
      this.#moderVoteService.vote$(this.pictureId, this.vote, this.reason).subscribe(() => this.voted.emit());
    }

    this.activeModal.close();
  }
}
