import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VehicleTypeService} from '../../services/vehicle-type';
import {getVehicleTypeTranslation} from '../../utils/translations';
import {map, shareReplay} from 'rxjs/operators';
import {VehicleType} from '@grpc/spec.pb';

const translateNames = (types: VehicleType[]): VehicleType[] => {
  types.forEach((type) => {
    type.name = getVehicleTypeTranslation(type.name);
    type.childs = translateNames(type.childs);
  });
  return types;
};

@Component({
  selector: 'app-vehicle-types-modal',
  templateUrl: './vehicle-types-modal.component.html',
})
export class VehicleTypesModalComponent {
  @Input() ids: string[] = [];
  @Output() changed = new EventEmitter<string[]>();
  public types$ = this.vehicleTypeService.getTypes().pipe(
    map((types) => translateNames(types)),
    shareReplay(1)
  );

  constructor(public activeModal: NgbActiveModal, private vehicleTypeService: VehicleTypeService) {}

  public isActive(id: number): boolean {
    return this.ids.indexOf(id.toString()) > -1;
  }

  public toggle(id: number) {
    if (this.ids.indexOf(id.toString()) > -1) {
      const index = this.ids.indexOf(id.toString(), 0);
      if (index > -1) {
        this.ids.splice(index, 1);
      }
    } else {
      this.ids.push(id.toString());
    }

    this.changed.emit(this.ids);
  }
}
