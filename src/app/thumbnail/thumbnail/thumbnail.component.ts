import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIPicture} from '../../services/picture';
import {Observable} from 'rxjs';
import {PictureItemService} from '../../services/picture-item';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIPerspectiveService} from '../../api/perspective/perspective.service';
import {getPerspectiveTranslation} from '../../utils/translations';
import {Perspective} from '@grpc/spec.pb';

interface ThumbnailAPIPicture extends APIPicture {
  selected?: boolean;
}

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent {
  @Input() picture: ThumbnailAPIPicture;
  @Input() route: string[];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  public perspectiveOptions$: Observable<Perspective[]> = this.perspectiveService.getPerspectives();
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  constructor(
    private perspectiveService: APIPerspectiveService,
    private pictureItemService: PictureItemService,
    private acl: ACLService
  ) {}

  public savePerspective() {
    if (this.picture.perspective_item) {
      this.pictureItemService
        .setPerspective(
          this.picture.id,
          this.picture.perspective_item.item_id,
          this.picture.perspective_item.type,
          this.picture.perspective_item.perspective_id
        )
        .subscribe();
    }
  }

  public onPictureSelect() {
    this.picture.selected = !this.picture.selected;
    this.selected.emit(this.picture.selected);
  }

  public getPerspectiveTranslation(id: string): string {
    return getPerspectiveTranslation(id);
  }
}
