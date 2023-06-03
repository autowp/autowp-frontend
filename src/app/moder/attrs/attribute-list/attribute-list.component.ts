import {Component, Input, Output, EventEmitter} from '@angular/core';
import {APIAttrAttribute} from '../../../api/attrs/attrs.service';
import {getAttrsTranslation} from '@utils/translations';

@Component({
  selector: 'app-moder-attrs-attribute-list',
  templateUrl: './attribute-list.component.html',
})
export class ModerAttrsAttributeListComponent {
  @Input() attributes: APIAttrAttribute[];
  @Output() movedUp = new EventEmitter<number>();
  @Output() movedDown = new EventEmitter<number>();

  protected moveUp(id: number) {
    this.movedUp.emit(id);
    return false;
  }

  protected moveDown(id: number) {
    this.movedDown.emit(id);
    return false;
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
