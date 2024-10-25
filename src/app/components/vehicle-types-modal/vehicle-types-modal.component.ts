import {AsyncPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {VehicleType} from '@grpc/spec.pb';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VehicleTypeService} from '@services/vehicle-type';
import {getVehicleTypeTranslation} from '@utils/translations';
import {map, shareReplay} from 'rxjs/operators';

const translateNames = (types: VehicleType[]): VehicleType[] => {
  types.forEach((type) => {
    type.name = getVehicleTypeTranslation(type.name);
    type.childs = translateNames(type.childs ? type.childs : []);
  });
  return types;
};

@Component({
  imports: [AsyncPipe],
  selector: 'app-vehicle-types-modal',
  standalone: true,
  templateUrl: './vehicle-types-modal.component.html',
})
export class VehicleTypesModalComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  private readonly vehicleTypeService = inject(VehicleTypeService);

  @Input() ids: string[] = [];
  @Output() changed = new EventEmitter<string[]>();
  protected readonly types$ = this.vehicleTypeService.getTypes$().pipe(
    map((types) => translateNames(types)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected isActive(id: number): boolean {
    return (this.ids || []).indexOf(id.toString()) > -1;
  }

  protected toggle(id: number) {
    const idStr = id.toString();
    const index = (this.ids || []).indexOf(idStr);
    if (index > -1) {
      this.ids.splice(index, 1);
    } else {
      this.ids.push(idStr);
    }

    this.changed.emit(this.ids);
  }
}
