import {Component, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
import { ACLService } from '../../services/acl.service';
import {APIPicture} from '../../services/picture';
import {Subscription} from 'rxjs';

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
export class CatalogueListItemComponent implements OnInit, OnDestroy {
  @Input() item: CatalogueListItem;

  public isModer = false;
  private sub: Subscription;

  constructor(private acl: ACLService) { }

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

  ngOnInit(): void {
    this.sub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
