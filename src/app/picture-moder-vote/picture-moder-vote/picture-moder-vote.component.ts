import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIPicture} from '@services/picture';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PictureModerVoteModalComponent} from './modal/modal.component';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-picture-moder-vote',
  templateUrl: './picture-moder-vote.component.html',
})
export class PictureModerVoteComponent {
  @Input() picture: APIPicture;
  @Output() changed = new EventEmitter();

  protected readonly moderVoteTemplateOptions$ = this.moderVoteTemplateService.getTemplates$().pipe(shareReplay(1));
  protected vote: any = null;
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

  protected ok(): void {
    if (this.save) {
      this.moderVoteTemplateService
        .createTemplate$({
          vote: this.vote,
          name: this.reason,
        })
        .subscribe();
    }

    this.votePicture(this.vote, this.reason);
  }

  protected showCustomDialog(vote: number): void {
    this.vote = vote;

    const modalRef = this.modalService.open(PictureModerVoteModalComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.pictureId = this.picture.id;
    modalRef.componentInstance.vote = vote;
    modalRef.componentInstance.voted.subscribe(() => {
      this.changed.emit();
    });
  }
}
