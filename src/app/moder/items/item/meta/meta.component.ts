import {Component, Input} from '@angular/core';
import {APIItem, ItemService} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIItemVehicleTypeGetResponse, APIService} from '../../../../services/api.service';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ItemType} from '../../../../../../generated/spec.pb';

@Component({
  selector: 'app-moder-items-item-meta',
  templateUrl: './meta.component.html'
})
export class ModerItemsItemMetaComponent {
  @Input() set item(item: APIItem) { this.item$.next(item); };
  public item$ = new BehaviorSubject<APIItem>(null);

  public loadingNumber = 0;

  public canEditMeta$ = this.acl.isAllowed(Resource.CAR, Privilege.EDIT_META);
  public invalidParams: any;

  public vehicleTypeIDs$: Observable<number[]> = this.item$.pipe(
    switchMap(item => {
      if (item.item_type_id === ItemType.ITEM_TYPE_VEHICLE || item.item_type_id === ItemType.ITEM_TYPE_TWINS) {
        return this.api.request<APIItemVehicleTypeGetResponse>('GET', 'item-vehicle-type', {
          params: {
            item_id: item.id.toString()
          }
        }).pipe(
          map(response => response.items.map(row => row.vehicle_type_id)),
        );
      }

      return of([])
    })
  );

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemService: ItemService
  ) {}

  public saveMeta(item: APIItem, vehicleTypeIDs: number[]) {
    this.loadingNumber++;

    const data = {
      // item_type_id: this.$state.params.item_type_id,
      name: item.name,
      full_name: item.full_name,
      catname: item.catname,
      body: item.body,
      spec_id: item.spec_id,
      begin_model_year: item.begin_model_year,
      end_model_year: item.end_model_year,
      begin_model_year_fraction: item.begin_model_year_fraction,
      end_model_year_fraction: item.end_model_year_fraction,
      begin_year: item.begin_year,
      begin_month: item.begin_month,
      end_year: item.end_year,
      end_month: item.end_month,
      today: item.today,
      produced: item.produced,
      produced_exactly: item.produced_exactly,
      is_concept: item.is_concept,
      is_group: item.is_group,
      lat: item.lat,
      lng: item.lng
    };

    forkJoin([
      this.api.request<void>('PUT', 'item/' + item.id, {body: data}).pipe(
        catchError(response => {
          this.invalidParams = response.error.invalid_params;
          return EMPTY;
        }),
        tap(() => (this.invalidParams = {}))
      ),
      this.itemService.setItemVehicleTypes(item.id, vehicleTypeIDs)
    ]).subscribe({
      complete: () => {
        this.loadingNumber--
      }
    });
  }
}
