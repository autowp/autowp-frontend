import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { APIItem } from '../../services/item';
import { Subscription } from 'rxjs';
import { ACLService } from '../../services/acl.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() item: APIItem;
  @Input() disableTitle: boolean;
  @Input() disableDescription: boolean;
  @Input() disableDetailsLink: boolean;

  public isModer = false;
  private sub: Subscription;

  constructor(private acl: ACLService) {}

  ngOnInit(): void {
    this.sub = this.acl
      .inheritsRole('moder')
      .subscribe(inherits => (this.isModer = inherits));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  public canHavePhoto(item: APIItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }

  public thumbnailColClass() {
    if (this.item.preview_pictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }
}
