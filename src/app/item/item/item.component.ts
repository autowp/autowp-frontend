import { Component, Input } from '@angular/core';
import { APIItem } from '../../services/item';
import {ACLService, Privilege, Resource} from '../../services/acl.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: APIItem;
  @Input() disableTitle: boolean;
  @Input() disableDescription: boolean;
  @Input() disableDetailsLink: boolean;

  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  constructor(private acl: ACLService) {}

  public havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
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
