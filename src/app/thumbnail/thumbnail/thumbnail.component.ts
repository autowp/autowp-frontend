import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIUser, Perspective} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPicture} from '@services/picture';
import {PictureItemService} from '@services/picture-item';
import {UserService} from '@services/user';
import {getPerspectiveTranslation} from '@utils/translations';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {APIPerspectiveService} from '../../api/perspective/perspective.service';

interface ThumbnailAPIPicture extends APIPicture {
  selected?: boolean;
}

@Component({
  selector: 'app-thumbnail',
  styleUrls: ['./thumbnail.component.scss'],
  templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
  @Input() set picture(picture: ThumbnailAPIPicture | null) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<ThumbnailAPIPicture | null>(null);

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
    private readonly pictureItemService: PictureItemService,
    private readonly acl: ACLService,
    private readonly userService: UserService,
  ) {}

  protected savePerspective(picture: ThumbnailAPIPicture) {
    if (picture.perspective_item) {
      this.pictureItemService
        .setPerspective$(
          picture.id,
          picture.perspective_item.item_id,
          picture.perspective_item.type,
          picture.perspective_item.perspective_id,
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
