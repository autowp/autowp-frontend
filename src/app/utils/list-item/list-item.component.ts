import {Component, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIPicture} from '../../services/picture';
import {Subscription} from 'rxjs';
import {APIImage} from '../../services/api.service';
import {APIItem, APIItemChildsCounts} from '../../services/item';

export interface CatalogueListItemPicture {
  picture: APIPicture;
  routerLink: string[];
  thumb?: APIImage;
}

export interface CatalogueListItem {
  id: number;
  preview_pictures: {
    large_format: boolean;
    pictures: CatalogueListItemPicture[];
  };
  item_type_id: number;
  produced: number;
  produced_exactly: boolean;
  name_html: string;
  name_default: string;
  design: {
    name: string;
    route: string[];
  };
  description: string;
  engine_vehicles?: [
    {
      route: string[];
      name_html: string;
    }
  ];
  has_text: boolean;
  accepted_pictures_count: number;
  can_edit_specs: boolean;
  picturesRouterLink: string[];
  specsRouterLink: string[];
  details: {
    routerLink: string[];
    count: number;
  };
  childs_counts: APIItemChildsCounts;
  categories?: APIItem[];
  twins_groups?: APIItem[];
}

@Component({
  selector: 'app-catalogue-list-item',
  templateUrl: './list-item.component.html'
})
@Injectable()
export class CatalogueListItemComponent implements OnInit, OnDestroy {
  @Input() item: CatalogueListItem;

  public isModer = false;
  private sub: Subscription;

  constructor(private acl: ACLService) { }

  public havePhoto(item: CatalogueListItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  public canHavePhoto(item: CatalogueListItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }

  ngOnInit(): void {
    this.sub = this.acl
      .isAllowed(Resource.GLOBAL, Privilege.MODERATE)
      .subscribe(isModer => (this.isModer = isModer));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public thumbnailColClass() {
    if (this.item.preview_pictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }
}
