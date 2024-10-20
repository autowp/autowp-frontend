import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIPicture} from '@services/picture';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {UserService} from '@services/user';
import {BehaviorSubject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {PictureModerVoteModalComponent} from './modal/modal.component';

@Component({
  selector: 'app-picture-moder-vote',
  templateUrl: './picture-moder-vote.component.html',
})
export class PictureModerVoteComponent {
  private readonly moderVoteService = inject(PictureModerVoteService);
  private readonly moderVoteTemplateService = inject(APIPictureModerVoteTemplateService);
  private readonly modalService = inject(NgbModal);
  private readonly userService = inject(UserService);

  @Input() set picture(picture: APIPicture | null) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<APIPicture | null>(null);

  @Output() changed = new EventEmitter<void>();

  protected readonly votes$ = this.picture$.pipe(
    map((picture) =>
      picture?.moder_votes.map((vote) => ({
        reason: vote.reason,
        user$: this.userService.getUser$('' + vote.user_id),
        vote: vote.vote,
      })),
    ),
  );

  protected readonly moderVoteTemplateOptions$ = this.moderVoteTemplateService.getTemplates$().pipe(shareReplay(1));
  protected vote: null | number = null;
  protected reason = '';
  protected save = false;

  protected votePicture(picture: APIPicture, vote: number, reason: string): void {
    this.moderVoteService.vote$('' + picture.id, vote, reason).subscribe(() => this.changed.emit());
  }

  protected cancelVotePicture(picture: APIPicture): void {
    this.moderVoteService.cancel$('' + picture.id).subscribe(() => this.changed.emit());
  }

  protected showCustomDialog(picture: APIPicture, vote: number): void {
    this.vote = vote;

    const modalRef = this.modalService.open(PictureModerVoteModalComponent, {
      centered: true,
      size: 'lg',
    });

    if (picture) {
      modalRef.componentInstance.pictureId = picture.id;
      modalRef.componentInstance.vote = vote;
      modalRef.componentInstance.voted.subscribe(() => {
        this.changed.emit();
      });
    }
  }
}
