import {Component, Input} from '@angular/core';
import {APIItem, ItemService} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIService} from '../../../../services/api.service';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {APIGetItemVehicleTypesRequest, ItemType} from '../../../../../../generated/spec.pb';
import {ItemMetaFormResult} from '../../item-meta-form/item-meta-form.component';
import {InvalidParams} from '../../../../utils/invalid-params.pipe';
import {ItemsClient} from '../../../../../../generated/spec.pbsc';

@Component({
  selector: 'app-moder-items-item-meta',
  templateUrl: './meta.component.html',
})
export class ModerItemsItemMetaComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);

  public loadingNumber = 0;

  public canEditMeta$ = this.acl.isAllowed(Resource.CAR, Privilege.EDIT_META);
  public invalidParams: InvalidParams;

  public vehicleTypeIDs$: Observable<string[]> = this.item$.pipe(
    switchMap((item) => {
      if (item.item_type_id === ItemType.ITEM_TYPE_VEHICLE || item.item_type_id === ItemType.ITEM_TYPE_TWINS) {
        return this.itemsClient
          .getItemVehicleTypes(
            new APIGetItemVehicleTypesRequest({
              itemId: item.id.toString(),
            })
          )
          .pipe(map((response) => response.items.map((row) => row.vehicleTypeId)));
      }

      return of([]);
    })
  );

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemService: ItemService,
    private itemsClient: ItemsClient
  ) {}

  public saveMeta(item: APIItem, event: ItemMetaFormResult) {
    this.loadingNumber++;

    const data = {
      name: event.name,
      full_name: event.full_name,
      catname: event.catname,
      body: event.body,
      spec_id: event.spec_id,
      begin_model_year: event.model_years?.begin_year,
      begin_model_year_fraction: event.model_years?.begin_year_fraction,
      end_model_year: event.model_years?.end_year,
      end_model_year_fraction: event.model_years?.end_year_fraction,
      begin_year: event.begin?.year,
      begin_month: event.begin?.month,
      end_year: event.end?.year,
      end_month: event.end?.month,
      today: event.end?.today,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      is_concept: event.is_concept === 'inherited' ? false : event.is_concept,
      is_concept_inherit: event.is_concept === 'inherited',
      is_group: event.is_group,
      lat: event.point?.lat,
      lng: event.point?.lng,
    };

    const pipes: Observable<any>[] = [
      this.api.request<void>('PUT', 'item/' + item.id, {body: data}).pipe(
        catchError((response) => {
          this.invalidParams = response.error.invalid_params;
          return EMPTY;
        }),
        tap(() => (this.invalidParams = {}))
      ),
    ];
    if ([ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(item.item_type_id)) {
      pipes.push(this.itemService.setItemVehicleTypes(item.id, event.vehicle_type_id));
    }

    forkJoin(pipes).subscribe({
      complete: () => {
        this.loadingNumber--;
      },
    });
  }
}
