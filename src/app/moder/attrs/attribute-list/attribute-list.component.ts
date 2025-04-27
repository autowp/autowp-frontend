import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {getAttrsTranslation} from '@utils/translations';

import {AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-moder-attrs-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsAttributeListComponent {
  readonly attributes = input.required<AttrAttributeTreeItem[]>();

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
