import { Component, Injectable, Input } from '@angular/core';
import { APIItem } from '../../services/item';
import { ACLService } from '../../services/acl.service';
import {APIPicture} from '../../services/picture';

export interface CatalogueListItemPicture {
  picture: APIPicture;
  routerLink: string[];
}

export interface CatalogueListItem {
  id: number;
  preview_pictures: CatalogueListItemPicture[];
  item_type_id: number;
  produced: number;
  produced_exactly: boolean;
  name_html: string;
  name_default: string;
  design: {
    url: string;
    name: string;
  };
  description: string;
  engine_vehicles?: [
    {
      url: string;
      name_html: string;
    }
  ];
  has_text: boolean;
  childs_count: number;
  accepted_pictures_count: number;
  can_edit_specs: boolean;
  routerLink: string[];
  picturesRouterLink: string[];
}

@Component({
  selector: 'app-catalogue-list-item',
  templateUrl: './list-item.component.html'
})
@Injectable()
export class CatalogueListItemComponent {
  @Input() item: CatalogueListItem;
  @Input() brand: APIItem;

  public isModer = false;

  constructor(private acl: ACLService) {
    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
  }

  public havePhoto(item: CatalogueListItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures) {
        if (picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  public canHavePhoto(item: CatalogueListItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }
}
