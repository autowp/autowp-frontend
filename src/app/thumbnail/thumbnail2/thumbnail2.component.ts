import {AsyncPipe, DecimalPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {APIUser, Picture, PictureStatus} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {UserService} from '@services/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {UserComponent} from '../../user/user/user.component';

interface ThumbnailAPIPicture extends Picture {
  selected?: boolean;
}

@Component({
  imports: [RouterLink, UserComponent, FormsModule, AsyncPipe, DecimalPipe],
  selector: 'app-thumbnail2',
  styleUrls: ['./thumbnail2.component.scss'],
  templateUrl: './thumbnail2.component.html',
})
export class Thumbnail2Component {
  // private readonly perspectiveService = inject(APIPerspectiveService);
  private readonly acl = inject(ACLService);
  private readonly userService = inject(UserService);
  // private readonly picturesClient = inject(PicturesClient);
  // private readonly toastService = inject(ToastsService);

  @Input() set picture(picture: null | ThumbnailAPIPicture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<null | ThumbnailAPIPicture>(null);

  @Input() route: string[] = [];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  // protected readonly perspectiveOptions$: Observable<Perspective[]> = this.perspectiveService.getPerspectives$();
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => this.userService.getUser$(picture?.ownerId)),
  );

  /*protected savePerspective(picture: ThumbnailAPIPicture) {
    if (picture.perspective_item) {
      this.picturesClient
        .setPictureItemPerspective(
          new SetPictureItemPerspectiveRequest({
            itemId: '' + picture.perspective_item.item_id,
            perspectiveId: picture.perspective_item.perspective_id,
            pictureId: '' + picture.id,
            type: picture.perspective_item.type,
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
  }*/

  protected onPictureSelect(picture: ThumbnailAPIPicture) {
    if (picture) {
      picture.selected = !picture.selected;
      this.selected.emit(picture.selected);
    }
  }

  // protected getPerspectiveTranslation(id: string): string {
  //   return getPerspectiveTranslation(id);
  // }
  protected readonly PictureStatus = PictureStatus;
}
