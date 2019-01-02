import { Component, Injectable, Input } from '@angular/core';
import { APIAttrListOption } from '../../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-attribute-list-options-tree',
  templateUrl: './list-options-tree.component.html'
})
@Injectable()
export class ModerAttrsAttributeListOptionsTreeComponent {
  @Input() items: APIAttrListOption[];
}
