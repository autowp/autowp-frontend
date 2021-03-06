import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { APIAttrZoneAttributeChange } from '../zone.component';
import { APIAttrAttribute } from '../../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-zone-attribute-list',
  templateUrl: './attribute-list.component.html'
})
@Injectable()
export class ModerAttrsZoneAttributeListComponent  {
  @Input() attributes: APIAttrAttribute[];
  @Input() map: {
    [key: number]: boolean
  };
  @Output() changed = new EventEmitter<APIAttrZoneAttributeChange>();

  public change(change: APIAttrZoneAttributeChange) {
    this.changed.emit(change);
  }
}
