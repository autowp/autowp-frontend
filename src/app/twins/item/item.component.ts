import {Component, Input} from '@angular/core';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIItem} from '../../services/item';

@Component({
  selector: 'app-twins-item',
  templateUrl: './item.component.html',
  styleUrls: ['./styles.scss'],
})
export class TwinsItemComponent {
  @Input() item: APIItem;
  @Input() group: APIItem;

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
}
