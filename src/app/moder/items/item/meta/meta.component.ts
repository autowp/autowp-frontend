import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {APIGetItemVehicleTypesRequest, APIItem, ItemType, UpdateItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {FieldMask} from '@ngx-grpc/well-known-types';
import {AuthService, Role} from '@services/auth.service';
import {ItemService} from '@services/item';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../../../grpc';
import {ToastsService} from '../../../../toasts/toasts.service';
import {
  ItemMetaFormComponent,
  ItemMetaFormResult,
  itemMetaFormResultsToAPIItem,
} from '../../item-meta-form/item-meta-form.component';

@Component({
  imports: [NgbProgressbar, ItemMetaFormComponent, AsyncPipe],
  selector: 'app-moder-items-item-meta',
  templateUrl: './meta.component.html',
})
export class ModerItemsItemMetaComponent {
  readonly #auth = inject(AuthService);
  readonly #itemService = inject(ItemService);
  readonly #itemsClient = inject(ItemsClient);
  readonly #toastService = inject(ToastsService);

  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem | null>(null);

  protected loadingNumber = 0;

  protected readonly canEditMeta$ = this.#auth.hasRole$(Role.CARS_MODER);
  protected invalidParams?: InvalidParams;

  protected readonly vehicleTypeIDs$: Observable<string[]> = this.item$.pipe(
    switchMap((item) => {
      if (item && (item.itemTypeId === ItemType.ITEM_TYPE_VEHICLE || item.itemTypeId === ItemType.ITEM_TYPE_TWINS)) {
        return this.#itemsClient
          .getItemVehicleTypes(
            new APIGetItemVehicleTypesRequest({
              itemId: item.id,
            }),
          )
          .pipe(map((response) => (response.items ? response.items : []).map((row) => row.vehicleTypeId)));
      }

      return of([]);
    }),
  );

  protected saveMeta(item: APIItem, event: ItemMetaFormResult) {
    this.loadingNumber++;

    const newItem = itemMetaFormResultsToAPIItem(event);
    newItem.id = item.id;

    const mask = ['name'];

    switch (item.itemTypeId) {
      case ItemType.ITEM_TYPE_BRAND:
        mask.push('begin_year', 'end_year', 'begin_month', 'end_month', 'today', 'full_name', 'catname');
        break;
      case ItemType.ITEM_TYPE_CATEGORY:
        mask.push('begin_year', 'end_year', 'begin_month', 'end_month', 'today', 'catname');
        break;
      case ItemType.ITEM_TYPE_COPYRIGHT:
        break;
      case ItemType.ITEM_TYPE_ENGINE:
      case ItemType.ITEM_TYPE_VEHICLE:
        mask.push(
          'begin_year',
          'end_year',
          'begin_month',
          'end_month',
          'today',
          'spec_id',
          'spec_inherit',
          'is_concept',
          'is_concept_inherit',
          'produced',
          'produced_exactly',
          'body',
          'begin_model_year',
          'end_model_year',
          'begin_model_year_fraction',
          'end_model_year_fraction',
          'is_group',
        );
        break;
      case ItemType.ITEM_TYPE_FACTORY:
      case ItemType.ITEM_TYPE_MUSEUM:
        mask.push('begin_year', 'end_year', 'begin_month', 'end_month', 'today', 'location');
        break;
      case ItemType.ITEM_TYPE_PERSON:
        mask.push('begin_year', 'end_year', 'begin_month', 'end_month', 'today');
        break;
      case ItemType.ITEM_TYPE_TWINS:
        mask.push('begin_year', 'end_year', 'begin_month', 'end_month', 'today', 'body');
        break;
    }

    const pipes: Observable<void>[] = [
      this.#itemsClient
        .updateItem(
          new UpdateItemRequest({
            item: newItem,
            updateMask: new FieldMask({paths: mask}),
          }),
        )
        .pipe(
          catchError((response: unknown) => {
            if (response instanceof GrpcStatusEvent) {
              const fieldViolations = extractFieldViolations(response);
              this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
            } else {
              this.#toastService.handleError(response);
            }
            return EMPTY;
          }),
          tap(() => (this.invalidParams = {})),
          map(() => void 0),
        ),
    ];
    if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)) {
      pipes.push(this.#itemService.setItemVehicleTypes$(item.id, event.vehicle_type_id));
    }

    forkJoin(pipes).subscribe({
      complete: () => {
        this.loadingNumber--;
      },
    });
  }
}
