import { Component, Input } from '@angular/core';
import { APIAttrListOption } from '../../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-attribute-list-options-tree',
  templateUrl: './list-options-tree.component.html'
})
export class ModerAttrsAttributeListOptionsTreeComponent {
  @Input() items: APIAttrListOption[];
}
