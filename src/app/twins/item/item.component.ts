import { Component, Injectable, Input, OnInit, OnDestroy } from '@angular/core';
import { ACLService } from '../../services/acl.service';
import { APIItem } from '../../services/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-twins-item',
  templateUrl: './item.component.html',
  styleUrls: ['./styles.scss']
})
@Injectable()
export class TwinsItemComponent implements OnInit, OnDestroy {
  @Input() item: APIItem;
  @Input() group: APIItem;

  public isModer = false;
  private sub: Subscription;

  constructor(private acl: ACLService) {}

  ngOnInit(): void {
    this.sub = this.acl
      .inheritsRole('moder')
      .subscribe(inherits => (this.isModer = inherits));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public havePhoto(item: APIItem) {
    if (item.preview_pictures) {
      for (const picture of item.preview_pictures.pictures) {
        if (picture && picture.picture) {
          return true;
        }
      }
    }
    return false;
  }

  public canHavePhoto(item: APIItem) {
    return [1, 2, 5, 6, 7].indexOf(item.item_type_id) !== -1;
  }
}
