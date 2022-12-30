import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VehicleTypeService} from '../../services/vehicle-type';
import {getVehicleTypeTranslation} from '../../utils/translations';

@Component({
  selector: 'app-vehicle-types-modal',
  templateUrl: './vehicle-types-modal.component.html',
})
export class VehicleTypesModalComponent {
  @Input() ids: number[] = [];
  @Output() changed = new EventEmitter<number[]>();
  public types$ = this.vehicleTypeService.getTypes();

  constructor(public activeModal: NgbActiveModal, private vehicleTypeService: VehicleTypeService) {}

  public isActive(id: number): boolean {
    return this.ids.indexOf(id) > -1;
  }

  public toggle(id: number) {
    if (this.ids.indexOf(id) > -1) {
      const index = this.ids.indexOf(id, 0);
      if (index > -1) {
        this.ids.splice(index, 1);
      }
    } else {
      this.ids.push(id);
    }

    this.changed.emit(this.ids);
  }

  public getVehicleTypeTranslation(id: string): string {
    return getVehicleTypeTranslation(id);
  }
}
