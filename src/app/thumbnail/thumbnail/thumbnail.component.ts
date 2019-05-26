import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { APIPicture } from '../../services/picture';
import { APIPerspective } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { PictureItemService } from '../../services/picture-item';
import { ACLService } from '../../services/acl.service';
import { APIPerspectiveService } from '../../api/perspective/perspective.service';

interface ThumbnailAPIPicture extends APIPicture {
  selected?: boolean;
}

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit, OnDestroy {

  @Input() picture: ThumbnailAPIPicture;
  @Input() url: string;
  @Input() route: string[];
  @Input() selectable = false;
  @Output() selected = new EventEmitter<boolean>();

  public perspectiveOptions: APIPerspective[] = [];
  public isModer = false;
  private sub: Subscription;
  private perspectiveSub: Subscription;

  constructor(
    private perspectiveService: APIPerspectiveService,
    private pictureItemService: PictureItemService,
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    this.sub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    if (this.picture.perspective_item) {
      this.perspectiveSub = this.perspectiveService
        .getPerspectives()
        .subscribe(perspectives => (this.perspectiveOptions = perspectives));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.perspectiveSub) {
      this.perspectiveSub.unsubscribe();
    }
  }

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

  public onPictureSelect($event: any) {
    this.picture.selected = !this.picture.selected;
    this.selected.emit(this.picture.selected);
  }

}
