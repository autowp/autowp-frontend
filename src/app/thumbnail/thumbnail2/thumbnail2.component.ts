import {AsyncPipe, DecimalPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {APIUser, Picture, PictureItem, PictureStatus, SetPictureItemPerspectiveRequest} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {UserService} from '@services/user';
import {getPerspectiveTranslation} from '@utils/translations';
import {APIPerspectiveService} from 'app/api/perspective/perspective.service';
import {ToastsService} from 'app/toasts/toasts.service';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

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
  readonly #perspectiveService = inject(APIPerspectiveService);
  readonly #acl = inject(ACLService);
  readonly #userService = inject(UserService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #toastService = inject(ToastsService);

  @Input() set picture(picture: null | ThumbnailAPIPicture) {
    this.picture$.next(picture);
  }
  protected readonly picture$ = new BehaviorSubject<null | ThumbnailAPIPicture>(null);

  @Input() route: string[] = [];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  protected readonly perspectiveOptions$ = this.#perspectiveService.getPerspectives$().pipe(
    map((options) =>
      options.map((option) => ({
        id: option.id,
        name: getPerspectiveTranslation(option.name),
      })),
    ),
  );
  protected readonly isModer$ = this.#acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => this.#userService.getUser$(picture?.ownerId)),
  );

  protected savePerspective(pictureItem: PictureItem) {
    this.#picturesClient
      .setPictureItemPerspective(
        new SetPictureItemPerspectiveRequest({
          itemId: pictureItem.itemId,
          perspectiveId: pictureItem.perspectiveId,
          pictureId: pictureItem.pictureId,
          type: pictureItem.type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.#toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected onPictureSelect(picture: ThumbnailAPIPicture) {
    if (picture) {
      picture.selected = !picture.selected;
      this.selected.emit(picture.selected);
    }
  }

  protected readonly PictureStatus = PictureStatus;
}
