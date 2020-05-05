import {Component, Injectable, Input, OnChanges, SimpleChanges} from '@angular/core';
import { APIItem } from '../services/item';
import { ACLService } from '../services/acl.service';
import {APIPicture} from '../services/picture';
import {APIImage} from '../services/api.service';

interface PictureThumbRoute {
  picture: APIPicture|null;
  thumb: APIImage|null;
  route: string[]|null;
}

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './list-item.component.html'
})
@Injectable()
export class CategoriesListItemComponent implements OnChanges {
  @Input() item: APIItem;
  @Input() parentRouterLink: string[];

  public isModer = false;
  public havePhoto = false;
  public canHavePhoto = false;
  public pictures: PictureThumbRoute[] = [];

  constructor(private acl: ACLService) {
    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
  }

  public isHavePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.havePhoto = this.item ? this.isHavePhoto(this.item) : false;
      this.canHavePhoto = [1, 2, 5, 6, 7].indexOf(this.item.item_type_id) !== -1;
    }

    if (changes.pictures || changes.parentRouterLink) {
      this.pictures = this.item.preview_pictures.pictures.map(pic => ({
        picture: pic ? pic.picture : null,
        thumb: pic ? pic.thumb : null,
        route: pic && pic.picture && this.parentRouterLink ? this.parentRouterLink.concat(['pictures', pic.picture.identity]) : null
      }));
    }
  }
}
