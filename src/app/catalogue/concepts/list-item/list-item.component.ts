import { Component, Injectable, Input } from '@angular/core';
import { APIItem } from '../../../services/item';
import { APIPicture } from '../../../services/picture';
import { ACLService } from '../../../services/acl.service';

@Component({
  selector: 'app-catalogue-concepts-list-item',
  templateUrl: './list-item.component.html'
})
@Injectable()
export class CatalogueConceptsListItemComponent {
  @Input() item: APIItem;
  @Input() brand: APIItem;

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

  public itemPictureRouterLink(picture: APIPicture): string[] {
    // TODO: full path to item
    return ['/', this.brand.catname, 'concepts', 'pictures', picture.identity];
  }

  public itemRouterLink(): string[] {
    // TODO: full path to item
    return ['/', this.brand.catname, 'concepts'];
  }
}
