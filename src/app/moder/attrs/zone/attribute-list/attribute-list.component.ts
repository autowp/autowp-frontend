import {Component, Input, Output, EventEmitter} from '@angular/core';
import {APIAttrZoneAttributeChange} from '../zone.component';
import {APIAttrAttribute} from '../../../../api/attrs/attrs.service';
import {getAttrsTranslation} from '@utils/translations';

@Component({
  selector: 'app-moder-attrs-zone-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsZoneAttributeListComponent {
  @Input() attributes: APIAttrAttribute[];
  @Input() map: {
    [key: number]: boolean;
  };
  @Output() changed = new EventEmitter<APIAttrZoneAttributeChange>();

  protected change(change: APIAttrZoneAttributeChange) {
    this.changed.emit(change);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
