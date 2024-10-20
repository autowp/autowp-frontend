import {Component, inject, Input} from '@angular/core';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem} from '@services/item';
import {APIPicture} from '@services/picture';

@Component({
  selector: 'app-new-list-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './list-item.component.html',
})
export class NewListItemComponent {
  private readonly acl = inject(ACLService);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  @Input() item: APIItem | null = null;
  @Input() pictures: APIPicture[] = [];
  @Input() totalPictures: number = 0;
  @Input() date: string = '';
}
