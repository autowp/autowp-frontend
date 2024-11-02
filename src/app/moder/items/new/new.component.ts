import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIGetItemVehicleTypesRequest, APIItem as GRPCAPIItem, ItemFields, ItemRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIService} from '@services/api.service';
import {APIItem, ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {getItemTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';
import {ItemMetaFormComponent, ItemMetaFormResult, ParentIsConcept} from '../item-meta-form/item-meta-form.component';

interface NewAPIItem extends APIItem {
  is_concept_inherit: boolean;
}

@Component({
  imports: [RouterLink, ItemMetaFormComponent, AsyncPipe],
  selector: 'app-moder-items-new',
  standalone: true,
  templateUrl: './new.component.html',
})
export class ModerItemsNewComponent {
  private readonly api = inject(APIService);
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected invalidParams: InvalidParams | undefined = undefined;

  private readonly itemTypeID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_type_id') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
    tap((itemTypeID) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 163,
        title: getItemTypeTranslation(itemTypeID, 'new-item'),
      });
    }),
  );

  protected readonly itemType$ = this.itemTypeID$.pipe(
    map((itemTypeID) => getItemTypeTranslation(itemTypeID, 'new-item')),
  );

  protected readonly item$: Observable<NewAPIItem> = this.itemTypeID$.pipe(
    map(
      (itemTypeID) =>
        ({
          alt_names: [],
          attr_zone_id: 0,
          begin_model_year: 0,
          begin_model_year_fraction: '',
          begin_month: 0,
          begin_year: 0,
          body: '',
          brands: [],
          catname: '',
          childs_count: 0,
          childs_counts: undefined,
          descendants_count: 0,
          description: '',
          design: undefined,
          end_model_year: 0,
          end_model_year_fraction: '',
          end_month: 0,
          end_year: 0,
          engine_id: null,
          engine_inherit: null,
          engine_vehicles_count: 0,
          full_name: '',
          id: 0,
          is_concept: 'inherited',
          is_concept_inherit: true,
          is_group: false,
          item_language_count: 0,
          item_of_day_pictures: [],
          item_type_id: itemTypeID,
          lat: 0,
          links_count: 0,
          lng: 0,
          logo: undefined,
          name: '',
          name_default: '',
          name_html: '',
          name_only: '',
          name_text: '',
          parents_count: 0,
          pictures_count: 0,
          preview_pictures: {
            large_format: false,
            pictures: [],
          },
          produced: null,
          produced_exactly: false,
          related_group_pictures: [],
          route: [],
          spec_id: 'inherited',
          subscription: false,
          text: '',
          today: null,
          twins_groups: [],
        }) as NewAPIItem,
    ),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly parentID$: Observable<string> = this.route.queryParamMap.pipe(
    map((params) => params.get('parent_id') ?? ''),
    distinctUntilChanged(),
  );

  protected readonly parent$: Observable<GRPCAPIItem | null> = this.parentID$.pipe(
    switchMap((parentID) => {
      if (!parentID) {
        return of(null);
      }

      return this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameHtml: true}),
          id: parentID,
          language: this.languageService.language,
        }),
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly vehicleTypeIDs$: Observable<string[]> = this.parent$.pipe(
    switchMap((item) => {
      if (item && [ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(item.itemTypeId)) {
        return this.itemsClient
          .getItemVehicleTypes(
            new APIGetItemVehicleTypesRequest({
              itemId: item.id.toString(),
            }),
          )
          .pipe(map((response) => (response.items ? response.items : []).map((row) => row.vehicleTypeId)));
      }
      return of([] as string[]);
    }),
  );

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
      .request$<void>('POST', 'item', {
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
        switchMap((response) => this.itemService.getItemByLocation$(response.headers.get('Location') ?? '', {})),
        switchMap((item) => {
          const pipes: Observable<null>[] = [
            this.parent$.pipe(
              take(1),
              switchMap((parent) =>
                parent
                  ? this.api
                      .request$<void>('POST', 'item-parent', {
                        body: {
                          item_id: item.id,
                          parent_id: parent.id,
                        },
                      })
                      .pipe(map(() => null))
                  : of(null),
              ),
            ),
          ];
          if ([ItemType.ITEM_TYPE_TWINS, ItemType.ITEM_TYPE_VEHICLE].includes(itemTypeID)) {
            pipes.push(this.itemService.setItemVehicleTypes$(item.id, event.vehicle_type_id).pipe(map(() => null)));
          }

          return forkJoin(pipes).pipe(
            tap(() => {
              if (localStorage) {
                localStorage.setItem('last_item', item.id.toString());
              }
              this.router.navigate(['/moder/items/item', item.id]);
            }),
          );
        }),
      )
      .subscribe();
  }

  protected readonly formParams$: Observable<{
    item: NewAPIItem;
    parentIsConcept: ParentIsConcept;
    vehicleTypeIDs: string[];
  }> = combineLatest([this.item$, this.parent$, this.vehicleTypeIDs$]).pipe(
    map(([item, parent, vehicleTypeIDs]) => ({
      item,
      parentIsConcept: {isConcept: parent ? parent.isConcept : false},
      vehicleTypeIDs,
    })),
  );
}
