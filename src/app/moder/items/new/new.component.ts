import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIGetItemVehicleTypesRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {getItemTypeTranslation} from '@utils/translations';
import {EMPTY, Observable, forkJoin, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';
import {ItemMetaFormResult} from '../item-meta-form/item-meta-form.component';

interface NewAPIItem extends APIItem {
  is_concept_inherit: boolean;
}

@Component({
  selector: 'app-moder-items-new',
  templateUrl: './new.component.html',
})
export class ModerItemsNewComponent {
  protected invalidParams: InvalidParams;

  private readonly itemTypeID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_type_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
    tap((itemTypeID) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 163,
        title: getItemTypeTranslation(itemTypeID, 'new-item'),
      });
    })
  );

  protected readonly itemType$ = this.itemTypeID$.pipe(
    map((itemTypeID) => getItemTypeTranslation(itemTypeID, 'new-item'))
  );

  protected readonly item$: Observable<NewAPIItem> = this.itemTypeID$.pipe(
    map(
      (itemTypeID) =>
        ({
          begin_model_year: undefined,
          begin_month: undefined,
          begin_year: undefined,
          body: undefined,
          catname: undefined,
          end_model_year: undefined,
          end_month: undefined,
          end_year: undefined,
          full_name: undefined,
          is_concept: false,
          is_concept_inherit: true,
          is_group: false,
          item_type_id: itemTypeID,
          lat: null,
          lng: null,
          name: undefined,
          produced: undefined,
          produced_exactly: false,
          spec_id: 'inherited',
          today: undefined,
        } as NewAPIItem)
    ),
    shareReplay(1)
  );

  private readonly parentID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('parent_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly parent$ = this.parentID$.pipe(
    switchMap((parentID) =>
      parentID ? this.itemService.getItem$(parentID, {fields: 'is_concept,name_html,spec_id'}) : of(null as APIItem)
    ),
    shareReplay(1)
  );

  protected readonly vehicleTypeIDs$ = this.parent$.pipe(
    switchMap((item) => {
      if (item && [ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.item_type_id)) {
        return this.itemsClient
          .getItemVehicleTypes(
            new APIGetItemVehicleTypesRequest({
              itemId: item.id.toString(),
            })
          )
          .pipe(map((response) => response.items.map((row) => row.vehicleTypeId)));
      }
      return of([] as string[]);
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient
  ) {}

  protected submit(itemTypeID: number, event: ItemMetaFormResult) {
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
      item_type_id: itemTypeID,
      lat: event.point?.lat,
      lng: event.point?.lng,
      name: event.name,
      produced: event.produced?.count,
      produced_exactly: event.produced?.exactly,
      spec_id: event.spec_id,
      today: event.end?.today,
    };

    this.api
      .request<void>('POST', 'item', {
        body: data,
        observe: 'response',
      })
      .pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse && response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else {
            this.toastService.handleError(response);
          }
          return EMPTY;
        }),
        switchMap((response) => this.itemService.getItemByLocation$(response.headers.get('Location'), {})),
        switchMap((item) => {
          const pipes: Observable<null>[] = [
            this.parent$.pipe(
              take(1),
              switchMap((parent) =>
                parent
                  ? this.api
                      .request<void>('POST', 'item-parent', {
                        body: {
                          item_id: item.id,
                          parent_id: parent.id,
                        },
                      })
                      .pipe(map(() => null))
                  : of(null)
              )
            ),
          ];
          if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(itemTypeID)) {
            pipes.push(this.itemService.setItemVehicleTypes$(item.id, event.vehicle_type_id));
          }

          return forkJoin(pipes).pipe(
            tap(() => {
              if (localStorage) {
                localStorage.setItem('last_item', item.id.toString());
              }
              this.router.navigate(['/moder/items/item', item.id]);
            })
          );
        })
      )
      .subscribe();
  }
}
