import {Component, Input} from '@angular/core';
import {AttrAttributeTreeItem} from '../../../../api/attrs/attrs.service';
import {getAttrsTranslation} from '@utils/translations';

@Component({
  selector: 'app-moder-attrs-zone-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsZoneAttributeListComponent {
  @Input() attributes: AttrAttributeTreeItem[];
  @Input() map: {
    [key: string]: boolean;
  };

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
