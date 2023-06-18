import {Component, Input} from '@angular/core';
import {AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';
import {getAttrsTranslation} from '@utils/translations';

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
