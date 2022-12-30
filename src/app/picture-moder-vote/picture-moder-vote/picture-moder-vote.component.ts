import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIPicture} from '../../services/picture';
import {PictureModerVoteService} from '../../services/picture-moder-vote';
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

  public moderVoteTemplateOptions$ = this.moderVoteTemplateService.getTemplates().pipe(shareReplay(1));
  public vote: any = null;
  public reason = '';
  public save = false;

  constructor(
    private moderVoteService: PictureModerVoteService,
    private moderVoteTemplateService: APIPictureModerVoteTemplateService,
    private modalService: NgbModal
  ) {}

  votePicture(vote: number, reason: string): void {
    this.moderVoteService.vote(this.picture.id, vote, reason).subscribe(() => this.changed.emit());
  }

  cancelVotePicture(): void {
    this.moderVoteService.cancel(this.picture.id).subscribe(() => this.changed.emit());
  }

  ok(): void {
    if (this.save) {
      this.moderVoteTemplateService
        .createTemplate({
          vote: this.vote,
          name: this.reason,
        })
        .subscribe();
    }

    this.votePicture(this.vote, this.reason);
  }

  showCustomDialog(vote: number): void {
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
