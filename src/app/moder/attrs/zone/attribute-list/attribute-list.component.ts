import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../../api/attrs/attrs.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-moder-attrs-zone-attribute-list',
  standalone: true,
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsZoneAttributeListComponent {
  readonly attributes = input.required<AttrAttributeTreeItem[]>();
  readonly map = input.required<Record<string, boolean>>();

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
