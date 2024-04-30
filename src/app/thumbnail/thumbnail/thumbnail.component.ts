import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Perspective} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPicture} from '@services/picture';
import {PictureItemService} from '@services/picture-item';
import {getPerspectiveTranslation} from '@utils/translations';
import {Observable} from 'rxjs';

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
  @Input() picture: ThumbnailAPIPicture | null = null;
  @Input() route: string[] = [];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  protected readonly perspectiveOptions$: Observable<Perspective[]> = this.perspectiveService.getPerspectives$();
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  constructor(
    private readonly perspectiveService: APIPerspectiveService,
    private readonly pictureItemService: PictureItemService,
    private readonly acl: ACLService,
  ) {}

  protected savePerspective() {
    if (this.picture && this.picture.perspective_item) {
      this.pictureItemService
        .setPerspective$(
          this.picture.id,
          this.picture.perspective_item.item_id,
          this.picture.perspective_item.type,
          this.picture.perspective_item.perspective_id,
        )
        .subscribe();
    }
  }

  protected onPictureSelect() {
    if (this.picture) {
      this.picture.selected = !this.picture.selected;
      this.selected.emit(this.picture.selected);
    }
  }

  protected getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
