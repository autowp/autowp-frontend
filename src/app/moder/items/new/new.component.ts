import {Component} from '@angular/core';
import {ItemService, APIItem} from '@services/item';
import {Router, ActivatedRoute} from '@angular/router';
import {of, forkJoin, EMPTY, Observable} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError, shareReplay, tap, take} from 'rxjs/operators';
import {APIService} from '@services/api.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {getItemTypeTranslation} from '@utils/translations';
import {APIGetItemVehicleTypesRequest, ItemType} from '@grpc/spec.pb';
import {ItemMetaFormResult} from '../item-meta-form/item-meta-form.component';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {ItemsClient} from '@grpc/spec.pbsc';
import {HttpErrorResponse} from '@angular/common/http';

interface NewAPIItem extends APIItem {
  is_concept_inherit: boolean;
}

@Component({
  selector: 'app-moder-items-new',
  templateUrl: './new.component.html',
})
export class ModerItemsNewComponent {
  public invalidParams: InvalidParams;

  private itemTypeID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_type_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
    tap((itemTypeID) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        title: getItemTypeTranslation(itemTypeID, 'new-item'),
        pageId: 163,
      });
    })
  );

  public itemType$ = this.itemTypeID$.pipe(map((itemTypeID) => getItemTypeTranslation(itemTypeID, 'new-item')));

  public item$: Observable<NewAPIItem> = this.itemTypeID$.pipe(
    map(
      (itemTypeID) =>
        ({
          produced_exactly: false,
          is_concept: false,
          is_concept_inherit: true,
          spec_id: 'inherited',
          item_type_id: itemTypeID,
          name: undefined,
          full_name: undefined,
          catname: undefined,
          body: undefined,
          begin_model_year: undefined,
          end_model_year: undefined,
          begin_year: undefined,
          begin_month: undefined,
          end_year: undefined,
          end_month: undefined,
          today: undefined,
          produced: undefined,
          is_group: false,
          lat: null,
          lng: null,
        } as NewAPIItem)
    ),
    shareReplay(1)
  );

  private parentID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('parent_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public parent$ = this.parentID$.pipe(
    switchMap((parentID) =>
      parentID ? this.itemService.getItem$(parentID, {fields: 'is_concept,name_html,spec_id'}) : of(null as APIItem)
    ),
    shareReplay(1)
  );

  public vehicleTypeIDs$ = this.parent$.pipe(
    switchMap((item) => {
      if (item && [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(item.item_type_id)) {
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
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private itemsClient: ItemsClient
  ) {}

  public submit(itemTypeID: number, event: ItemMetaFormResult) {
    const data = {
      item_type_id: itemTypeID,
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
          const pipes: Observable<any>[] = [
            this.parent$.pipe(
              take(1),
              switchMap((parent) =>
                parent
                  ? this.api.request<void>('POST', 'item-parent', {
                      body: {
                        parent_id: parent.id,
                        item_id: item.id,
                      },
                    })
                  : of(null)
              )
            ),
          ];
          if ([ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_TWINS].includes(itemTypeID)) {
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
