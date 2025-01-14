import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage} from '@services/api.service';
import {APIItem, APIItemChildsCounts} from '@services/item';
import {APIPicture} from '@services/picture';

import {ItemHeaderComponent} from '../item-header/item-header.component';
import {MarkdownComponent} from '../markdown/markdown.component';

export interface CatalogueListItem {
  accepted_pictures_count: number | undefined;
  can_edit_specs: boolean | undefined;
  categories?: APIItem[];
  childs_counts: APIItemChildsCounts | null;
  description: null | string;
  design: null | {
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
    },
  ];
  has_text: boolean;
  id: number;
  item_type_id: number;
  name_default: string;
  name_html: string;
  picturesRouterLink: null | string[];
  preview_pictures: {
    large_format: boolean;
    pictures: CatalogueListItemPicture[];
  };
  produced: null | number;
  produced_exactly: boolean | null;
  specsRouterLink: null | string[];
  twins_groups?: APIItem[];
}

export interface CatalogueListItemPicture {
  picture: APIPicture | null;
  routerLink?: string[];
  thumb?: APIImage | null;
}

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-catalogue-list-item',
  templateUrl: './list-item.component.html',
})
export class CatalogueListItemComponent {
  private readonly acl = inject(ACLService);

  @Input() item: CatalogueListItem | null = null;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected havePhoto(item: CatalogueListItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture?.picture) {
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
    if (this.item && this.item.preview_pictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }

  protected readonly ItemType = ItemType;
}
