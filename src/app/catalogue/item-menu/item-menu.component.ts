import type {APIItemChildsCounts} from '@services/item';
import type {ItemHeader} from '@utils/item-header/item-header.component';

import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';

@Component({
  imports: [RouterLink, ItemHeaderComponent],
  selector: 'app-catalogue-item-menu',
  templateUrl: './item-menu.component.html',
})
export class CatalogueItemMenuComponent {
  @Input() itemRouterLink: string[] = [];
  @Input() header?: ItemHeader;
  @Input() childsCounts?: APIItemChildsCounts;
  @Input() picturesCount = 0;
  @Input() active = 'default';
}
