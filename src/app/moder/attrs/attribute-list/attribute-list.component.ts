import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';

@Component({
  imports: [RouterLink],
  selector: 'app-moder-attrs-attribute-list',
  standalone: true,
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsAttributeListComponent {
  @Input() attributes: AttrAttributeTreeItem[] = [];

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
