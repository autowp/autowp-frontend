import {Component, Input} from '@angular/core';
import {ItemHeader} from '@utils/item-header/item-header.component';
import {APIItemChildsCounts} from '@services/item';

@Component({
  selector: 'app-catalogue-item-menu',
  templateUrl: './item-menu.component.html',
})
export class CatalogueItemMenuComponent {
  @Input() itemRouterLink: string[];
  @Input() header: ItemHeader;
  @Input() childsCounts: APIItemChildsCounts;
  @Input() picturesCount: number;
  @Input() active = 'default';
}
