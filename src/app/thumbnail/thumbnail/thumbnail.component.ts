import {AsyncPipe, DecimalPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
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
import {UserComponent} from '../../user/user/user.component';

interface ThumbnailAPIPicture extends APIPicture {
  selected?: boolean;
}

@Component({
  imports: [RouterLink, UserComponent, FormsModule, AsyncPipe, DecimalPipe],
  selector: 'app-thumbnail',
  standalone: true,
  styleUrls: ['./thumbnail.component.scss'],
  templateUrl: './thumbnail.component.html',
})
export class ThumbnailComponent {
  private readonly perspectiveService = inject(APIPerspectiveService);
  private readonly acl = inject(ACLService);
  private readonly userService = inject(UserService);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

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
