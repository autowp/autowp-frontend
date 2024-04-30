import {Component, Input} from '@angular/core';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-zone-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsZoneAttributeListComponent {
  @Input() attributes: AttrAttributeTreeItem[] = [];
  @Input() map: {
    [key: string]: boolean;
  } = {};

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
