import type {APIItemChildsCounts} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIImage, APIItem, APIUser, Design, ItemType, Picture} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {Observable} from 'rxjs';

import {UserComponent} from '../../user/user/user.component';
import {ItemHeaderComponent} from '../item-header/item-header.component';
import {MarkdownComponent} from '../markdown/markdown.component';

export interface CatalogueListItem {
  acceptedPicturesCount: number | undefined;
  canEditSpecs: boolean | undefined;
  categories?: APIItem[];
  childsCounts: APIItemChildsCounts | null;
  contributors?: Observable<APIUser | null>[];
  description: null | string;
  design: Design | undefined;
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
    pictures: CatalogueListItemPicture[];
  };
  produced: null | number;
  producedExactly: boolean | null;
  specsRouterLink: null | string[];
  twinsGroups?: APIItem[];
}

export interface CatalogueListItemPicture {
  picture: null | Picture;
  routerLink?: string[];
  thumb?: APIImage | null;
}

@Component({
  imports: [ItemHeaderComponent, RouterLink, MarkdownComponent, AsyncPipe, UserComponent],
  selector: 'app-catalogue-list-item',
  templateUrl: './list-item.component.html',
})
export class CatalogueListItemComponent {
  private readonly acl = inject(ACLService);

  @Input() item: CatalogueListItem | null = null;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  protected havePhoto(item: CatalogueListItem) {
    if (item.previewPictures) {
      for (const picture of item.previewPictures.pictures) {
        if (picture?.picture) {
          return true;
        }
      }
    }
    return false;
  }

  protected canHavePhoto(item: CatalogueListItem) {
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
