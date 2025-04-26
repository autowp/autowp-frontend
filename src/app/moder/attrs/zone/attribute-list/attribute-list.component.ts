import {Component, Input} from '@angular/core';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-zone-attribute-list',
  standalone: true,
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsZoneAttributeListComponent {
  @Input() attributes: AttrAttributeTreeItem[] = [];
  @Input() map: Record<string, boolean> = {};

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
