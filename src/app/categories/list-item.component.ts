import { Component, Injectable, Input } from '@angular/core';
import { APIItem } from '../services/item';
import { APIPicture } from '../services/picture';
import { ACLService } from '../services/acl.service';

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html'
})
@Injectable()
export class CategoriesListItemComponent {
  @Input() item: APIItem;
  @Input() urlPrefix: string;
  @Input() routerLink: string[];

  public isModer = false;

  constructor(private acl: ACLService) {
    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
  }

  public havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures) {
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

  public itemPictureUrl(picture: APIPicture): string {
    return this.urlPrefix + '/pictures/' + picture.identity;
  }
}
