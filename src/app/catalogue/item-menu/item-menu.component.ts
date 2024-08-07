import {Component, Input} from '@angular/core';
import {APIItemChildsCounts} from '@services/item';
import {ItemHeader} from '@utils/item-header/item-header.component';

@Component({
  selector: 'app-catalogue-item-menu',
  templateUrl: './item-menu.component.html',
})
export class CatalogueItemMenuComponent {
  @Input() itemRouterLink: string[] = [];
  @Input() header?: ItemHeader;
  @Input() childsCounts?: APIItemChildsCounts;
  @Input() picturesCount: number = 0;
  @Input() active = 'default';
}
