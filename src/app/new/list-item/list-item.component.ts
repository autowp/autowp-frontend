import { Component, Input} from '@angular/core';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import { APIItem } from '../../services/item';
import { APIPicture } from '../../services/picture';

@Component({
  selector: 'app-new-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./styles.scss']
})
export class NewListItemComponent {
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);
  @Input() item: APIItem;
  @Input() pictures: APIPicture[];
  @Input() totalPictures: number;
  @Input() date: string;

  constructor(private acl: ACLService) {}
}
