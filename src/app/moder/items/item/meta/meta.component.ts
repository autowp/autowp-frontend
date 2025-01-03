import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, Input} from '@angular/core';
import {APIGetItemVehicleTypesRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {ItemService} from '@services/item';
import type {APIItem} from '@services/item';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ItemMetaFormComponent, ItemMetaFormResult} from '../../item-meta-form/item-meta-form.component';

@Component({
  imports: [NgbProgressbar, ItemMetaFormComponent, AsyncPipe],
  selector: 'app-moder-items-item-meta',
  templateUrl: './meta.component.html',
})
export class ModerItemsItemMetaComponent {
  private readonly acl = inject(ACLService);
  private readonly api = inject(APIService);
  private readonly itemService = inject(ItemService);
  private readonly itemsClient = inject(ItemsClient);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected loadingNumber = 0;

  protected readonly canEditMeta$ = this.acl.isAllowed$(Resource.CAR, Privilege.EDIT_META);
  protected invalidParams?: InvalidParams;

  protected readonly vehicleTypeIDs$: Observable<string[]> = this.item$.pipe(
    switchMap((item) => {
      if (
        item &&
        (item.item_type_id === ItemType.ITEM_TYPE_VEHICLE || item.item_type_id === ItemType.ITEM_TYPE_TWINS)
      ) {
        return this.itemsClient
          .getItemVehicleTypes(
            new APIGetItemVehicleTypesRequest({
              itemId: item.id.toString(),
            }),
          )
          .pipe(map((response) => (response.items ? response.items : []).map((row) => row.vehicleTypeId)));
      }

      return of([]);
    }),
  );

  protected saveMeta(item: APIItem, event: ItemMetaFormResult) {
    this.loadingNumber++;

    const data = {
      begin_model_year: event.model_years?.begin_year,
      begin_model_year_fraction: event.model_years?.begin_year_fraction,
      begin_month: event.begin?.month,
      begin_year: event.begin?.year,
      body: event.body,
      catname: event.catname,
      end_model_year: event.model_years?.end_year,
      end_model_year_fraction: event.model_years?.end_year_fraction,
      end_month: event.end?.month,
      end_year: event.end?.year,
      full_name: event.full_name,
      is_concept: event.is_concept === 'inherited' ? false : event.is_concept,
      is_concept_inherit: event.is_concept === 'inherited',
      is_group: event.is_group,
      lat: event.point?.lat,
      lng: event.point?.lng,
      name: event.name,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      spec_id: event.spec_id,
      today: event.end?.today,
    };

    const pipes: Observable<void>[] = [
      this.api.request$<void>('PUT', 'item/' + item.id, {body: data}).pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.invalidParams = response.error.invalid_params;
          }
          return EMPTY;
        }),
        tap(() => (this.invalidParams = {})),
      ),
    ];
    if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.item_type_id)) {
      pipes.push(this.itemService.setItemVehicleTypes$(item.id, event.vehicle_type_id));
    }

    forkJoin(pipes).subscribe({
      complete: () => {
        this.loadingNumber--;
      },
    });
  }
}
