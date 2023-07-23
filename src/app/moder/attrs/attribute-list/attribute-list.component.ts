import {Component, Input} from '@angular/core';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsAttributeListComponent {
  @Input() attributes: AttrAttributeTreeItem[];

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
