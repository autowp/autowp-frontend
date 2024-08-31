import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIUser, Perspective, SetPictureItemPerspectiveRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPicture} from '@services/picture';
import {UserService} from '@services/user';
import {getPerspectiveTranslation} from '@utils/translations';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import {APIPerspectiveService} from '../../api/perspective/perspective.service';
import {ToastsService} from '../../toasts/toasts.service';

interface ThumbnailAPIPicture extends APIPicture {
  selected?: boolean;
}

@Component({
  selector: 'app-thumbnail',
  styleUrls: ['./thumbnail.component.scss'],
  templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
  @Input() set picture(picture: null | ThumbnailAPIPicture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<null | ThumbnailAPIPicture>(null);

  @Input() route: string[] = [];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  protected readonly perspectiveOptions$: Observable<Perspective[]> = this.perspectiveService.getPerspectives$();
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => (picture?.owner_id ? this.userService.getUser$(picture.owner_id) : of(null))),
  );

  constructor(
    private readonly perspectiveService: APIPerspectiveService,
    private readonly acl: ACLService,
    private readonly userService: UserService,
    private readonly picturesClient: PicturesClient,
    private readonly toastService: ToastsService,
  ) {}

  protected savePerspective(picture: ThumbnailAPIPicture) {
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
  }

  protected onPictureSelect(picture: ThumbnailAPIPicture) {
    if (picture) {
      picture.selected = !picture.selected;
      this.selected.emit(picture.selected);
    }
  }

  protected getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
