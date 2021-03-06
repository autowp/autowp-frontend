import {
  Component,
  Injectable,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  VehicleTypeService,
  APIVehicleType
} from '../../services/vehicle-type';
import { Subscription } from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-vehicle-types-modal',
  templateUrl: './vehicle-types-modal.component.html'
})
@Injectable()
export class VehicleTypesModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[] = [];
  @Output() changed = new EventEmitter();
  public types: APIVehicleType[];
  private sub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private vehicleTypeService: VehicleTypeService,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    this.sub = this.vehicleTypeService.getTypes().subscribe(
      types => this.types = types,
      error => this.toastService.response(error)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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

    this.changed.emit();
  }
}
