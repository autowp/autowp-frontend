import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIPicture} from '@services/picture';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {shareReplay} from 'rxjs/operators';

import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {PictureModerVoteModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-picture-moder-vote',
  templateUrl: './picture-moder-vote.component.html',
})
export class PictureModerVoteComponent {
  @Input() picture: APIPicture;
  @Output() changed = new EventEmitter();

  protected readonly moderVoteTemplateOptions$ = this.moderVoteTemplateService.getTemplates$().pipe(shareReplay(1));
  protected vote: number = null;
  protected reason = '';
  protected save = false;

  constructor(
    private readonly moderVoteService: PictureModerVoteService,
    private readonly moderVoteTemplateService: APIPictureModerVoteTemplateService,
    private readonly modalService: NgbModal
  ) {}

  protected votePicture(vote: number, reason: string): void {
    this.moderVoteService.vote$(this.picture.id, vote, reason).subscribe(() => this.changed.emit());
  }

  protected cancelVotePicture(): void {
    this.moderVoteService.cancel$(this.picture.id).subscribe(() => this.changed.emit());
  }

  protected showCustomDialog(vote: number): void {
    this.vote = vote;

    const modalRef = this.modalService.open(PictureModerVoteModalComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.pictureId = this.picture.id;
    modalRef.componentInstance.vote = vote;
    modalRef.componentInstance.voted.subscribe(() => {
      this.changed.emit();
    });
  }
}
