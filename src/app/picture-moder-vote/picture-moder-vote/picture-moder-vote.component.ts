import {AsyncPipe, NgStyle} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Picture} from '@grpc/spec.pb';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {UserService} from '@services/user';
import {BehaviorSubject} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {UserComponent} from '../../user/user/user.component';
import {PictureModerVoteModalComponent} from './modal/modal.component';

@Component({
  imports: [NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, UserComponent, NgStyle, AsyncPipe],
  selector: 'app-picture-moder-vote',
  templateUrl: './picture-moder-vote.component.html',
})
export class PictureModerVoteComponent {
  readonly #moderVoteService = inject(PictureModerVoteService);
  readonly #moderVoteTemplateService = inject(APIPictureModerVoteTemplateService);
  readonly #modalService = inject(NgbModal);
  readonly #userService = inject(UserService);

  @Input() set picture(picture: null | Picture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<null | Picture>(null);

  @Output() changed = new EventEmitter<void>();

  protected readonly votes$ = this.picture$.pipe(
    map((picture) =>
      (picture?.pictureModerVotes?.items || []).map((vote) => ({
        reason: vote.reason,
        user$: this.#userService.getUser$(vote.userId),
        vote: vote.vote,
      })),
    ),
  );

  protected readonly moderVoteTemplateOptions$ = this.#moderVoteTemplateService
    .getTemplates$()
    .pipe(shareReplay({bufferSize: 1, refCount: false}));
  protected vote: null | number = null;
  protected reason = '';
  protected save = false;

  protected votePicture(picture: Picture, vote: number, reason: string): void {
    this.#moderVoteService.vote$(picture.id, vote, reason).subscribe(() => this.changed.emit());
  }

  protected cancelVotePicture(picture: Picture): void {
    this.#moderVoteService.cancel$(picture.id).subscribe(() => this.changed.emit());
  }

  protected showCustomDialog(picture: Picture, vote: number): void {
    this.vote = vote;

    const modalRef = this.#modalService.open(PictureModerVoteModalComponent, {
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
