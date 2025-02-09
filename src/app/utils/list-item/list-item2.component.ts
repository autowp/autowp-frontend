import type {APIItemChildsCounts} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIImage, APIItem, ItemType, Picture} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';

import {ItemHeaderComponent} from '../item-header/item-header.component';
import {MarkdownComponent} from '../markdown/markdown.component';

export interface CatalogueListItem2 {
  acceptedPicturesCount: number | undefined;
  canEditSpecs: boolean | undefined;
  categories?: APIItem[];
  childsCounts: APIItemChildsCounts | null;
  description: null | string;
  design: null | {
    name: string;
    route: string[];
  };
  details: {
    count: number;
    routerLink: string[];
  };
  engineVehicles?: APIItem[];
  hasText: boolean;
  id: string;
  itemTypeId: number;
  nameDefault: string;
  nameHtml: string;
  picturesRouterLink: null | string[];
  previewPictures: {
    largeFormat: boolean;
    pictures: CatalogueListItemPicture2[];
  };
  produced: null | number;
  producedExactly: boolean | null;
  specsRouterLink: null | string[];
  twinsGroups?: APIItem[];
}

export interface CatalogueListItemPicture2 {
  picture: null | Picture;
  routerLink?: string[];
  thumb?: APIImage | null;
}

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe],
  selector: 'app-catalogue-list-item2',
  templateUrl: './list-item2.component.html',
})
export class CatalogueListItem2Component {
  private readonly acl = inject(ACLService);

  @Input() item: CatalogueListItem2 | null = null;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected havePhoto(item: CatalogueListItem2) {
    if (item.previewPictures) {
      for (const picture of item.previewPictures.pictures) {
        if (picture?.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: CatalogueListItem2) {
    return (
      [
        ItemType.ITEM_TYPE_VEHICLE,
        ItemType.ITEM_TYPE_ENGINE,
        ItemType.ITEM_TYPE_BRAND,
        ItemType.ITEM_TYPE_FACTORY,
        ItemType.ITEM_TYPE_MUSEUM,
      ].indexOf(item.itemTypeId) !== -1
    );
  }

  protected thumbnailColClass() {
    if (this.item && this.item.previewPictures.pictures.length === 3) {
      return 'col-sm-4';
    }

    return 'col-6 col-lg-3';
  }

  protected readonly ItemType = ItemType;
}
