import {Component, Input} from '@angular/core';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage} from '@services/api.service';
import {APIItem, APIItemChildsCounts} from '@services/item';
import {APIPicture} from '@services/picture';

export interface CatalogueListItemPicture {
  picture: APIPicture;
  routerLink: string[];
  thumb?: APIImage;
}

export interface CatalogueListItem {
  accepted_pictures_count: number;
  can_edit_specs: boolean;
  categories?: APIItem[];
  childs_counts: APIItemChildsCounts;
  description: string;
  design: {
    name: string;
    route: string[];
  };
  details: {
    count: number;
    routerLink: string[];
  };
  engine_vehicles?: [
    {
      name_html: string;
      route: string[];
    }
  ];
  has_text: boolean;
  id: number;
  item_type_id: number;
  name_default: string;
  name_html: string;
  picturesRouterLink: string[];
  preview_pictures: {
    large_format: boolean;
    pictures: CatalogueListItemPicture[];
  };
  produced: number;
  produced_exactly: boolean;
  specsRouterLink: string[];
  twins_groups?: APIItem[];
}

@Component({
  selector: 'app-catalogue-list-item',
  templateUrl: './list-item.component.html',
})
export class CatalogueListItemComponent {
  @Input() item: CatalogueListItem;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  constructor(private readonly acl: ACLService) {}

  protected havePhoto(item: CatalogueListItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: CatalogueListItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }

  protected thumbnailColClass() {
    if (this.item.preview_pictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }
}
