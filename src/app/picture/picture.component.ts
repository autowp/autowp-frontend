import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  APIUser,
  CommentsSubscribeRequest,
  CommentsType,
  CommentsUnSubscribeRequest,
  PictureStatus,
  PicturesViewRequest,
  SetPictureItemPerspectiveRequest,
  SetPictureStatusRequest,
} from '@grpc/spec.pb';
import {CommentsClient, PicturesClient} from '@grpc/spec.pbsc';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbProgressbar, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {APIItem} from '@services/item';
import {PictureService} from '@services/picture';
import type {APIPicture} from '@services/picture';
import {APIPictureItem} from '@services/picture-item';
import {UserService} from '@services/user';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {NgDatePipesModule, NgMathPipesModule} from 'ngx-pipes';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ModerPicturesPerspectivePickerComponent} from '../moder/pictures/perspective-picker/perspective-picker.component';
import {PictureModerVoteComponent} from '../picture-moder-vote/picture-moder-vote/picture-moder-vote.component';
import {ShareComponent} from '../share/share.component';
import {ToastsService} from '../toasts/toasts.service';
import {UserComponent} from '../user/user/user.component';
import {PicturePaginatorComponent} from './paginator.component';

@Component({
  imports: [
    RouterLink,
    ShareComponent,
    MarkdownComponent,
    UserComponent,
    NgbTooltip,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    PicturePaginatorComponent,
    PictureModerVoteComponent,
    NgbProgressbar,
    ModerPicturesPerspectivePickerComponent,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgMathPipesModule,
    NgDatePipesModule,
    TimeAgoPipe,
  ],
  selector: 'app-picture',
  styleUrls: ['./picture.component.scss'],
  templateUrl: './picture.component.html',
})
export class PictureComponent {
  private readonly acl = inject(ACLService);
  private readonly auth = inject(AuthService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);
  private readonly commentsGrpc = inject(CommentsClient);
  private readonly picturesClient = inject(PicturesClient);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastsService);

  @Input() prefix: string[] = [];
  @Input() galleryRoute: string[] = [];
  @Input() h2 = false;
  @Output() changed = new EventEmitter<boolean>();

  @Input() set picture(picture: APIPicture) {
    this.picture$.next(picture);

    this.picturesClient
      .view(
        new PicturesViewRequest({
          pictureId: '' + picture.id,
        }),
      )
      .subscribe();
  }
  protected readonly picture$ = new BehaviorSubject<APIPicture | null>(null);

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => (picture?.owner_id ? this.userService.getUser$(picture.owner_id) : of(null))),
  );

  protected readonly moderVotes$ = this.picture$.pipe(
    map((picture) =>
      picture?.moder_votes.map((vote) => ({
        reason: vote.reason,
        user$: this.userService.getUser$('' + vote.user_id),
        vote: vote.vote,
      })),
    ),
  );

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly canEditSpecs$ = this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT);
  protected showShareDialog = false;
  protected location = location;
  protected engines: APIItem[] = [];
  protected statusLoading = false;

  protected readonly user$ = this.auth.getUser$();

  protected savePerspective(perspectiveID: null | number, item: APIPictureItem) {
    this.picturesClient
      .setPictureItemPerspective(
        new SetPictureItemPerspectiveRequest({
          itemId: '' + item.item_id,
          perspectiveId: perspectiveID ?? undefined,
          pictureId: '' + item.picture_id,
          type: item.type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected pictureVoted() {
    this.changed.emit(true);
  }

  protected toggleShareDialog(): false {
    this.showShareDialog = !this.showShareDialog;
    return false;
  }

  protected setSubscribed(picture: APIPicture, value: boolean) {
    (value
      ? this.commentsGrpc.subscribe(
          new CommentsSubscribeRequest({
            itemId: '' + picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          }),
        )
      : this.commentsGrpc.unSubscribe(
          new CommentsUnSubscribeRequest({
            itemId: '' + picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          }),
        )
    ).subscribe(() => {
      picture.subscribed = value;
    });
  }

  protected vote(picture: APIPicture, value: number) {
    this.pictureService.vote$(picture.id, value).subscribe((votes) => {
      picture.votes = votes;
    });
    return false;
  }

  protected openSource(picture: APIPicture) {
    window.open(picture.image.src);
  }

  protected openGallery(picture: APIPicture, $event: MouseEvent) {
    if ($event.ctrlKey) {
      this.openSource(picture);
      return;
    }
    this.router.navigate(this.galleryRoute ? this.galleryRoute : ['../../gallery', picture.identity]);
  }

  private setPictureStatus(picture: APIPicture, status: PictureStatus) {
    this.statusLoading = true;
    this.picturesClient
      .setPictureStatus(new SetPictureStatusRequest({id: picture.id + '', status}))
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
      )
      .subscribe({
        complete: () => {
          this.statusLoading = false;
        },
        next: () => {
          this.changed.emit(true);
        },
      });
  }

  protected unacceptPicture(picture: APIPicture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_INBOX);
  }

  protected acceptPicture(picture: APIPicture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_ACCEPTED);
  }

  protected deletePicture(picture: APIPicture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_REMOVING);
  }

  protected restorePicture(picture: APIPicture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_INBOX);
  }
}
