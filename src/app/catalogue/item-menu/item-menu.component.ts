import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIItemChildsCounts} from '@services/item';
import {ItemHeader, ItemHeaderComponent} from '@utils/item-header/item-header.component';

@Component({
  imports: [RouterLink, ItemHeaderComponent],
  selector: 'app-catalogue-item-menu',
  standalone: true,
  templateUrl: './item-menu.component.html',
})
export class CatalogueItemMenuComponent {
  @Input() itemRouterLink: string[] = [];
  @Input() header?: ItemHeader;
  @Input() childsCounts?: APIItemChildsCounts;
  @Input() picturesCount: number = 0;
  @Input() active = 'default';
}
