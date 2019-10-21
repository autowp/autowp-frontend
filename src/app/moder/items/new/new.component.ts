import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpecService, APISpec } from '../../../services/spec';
import { ItemService, APIItem } from '../../../services/item';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription, of, forkJoin, EMPTY} from 'rxjs';
import { PageEnvService } from '../../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  finalize,
  map,
  catchError
} from 'rxjs/operators';
import { APIItemVehicleTypeGetResponse } from '../../../services/api.service';
import {ToastsService} from '../../../toasts/toasts.service';

// Acl.isAllowed('car', 'add', 'unauthorized');

interface NewItem {
  produced_exactly: boolean;
  is_concept: any;
  spec_id: any;
  item_type_id: number;
  name: any;
  full_name: any;
  catname: any;
  body: any;
  begin_model_year: any;
  end_model_year: any;
  begin_year: any;
  begin_month: any;
  end_year: any;
  end_month: any;
  today: any;
  produced: any;
  is_group: boolean;
  lat: any;
  lng: any;
}

@Component({
  selector: 'app-moder-items-new',
  templateUrl: './new.component.html'
})
@Injectable()
export class ModerItemsNewComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public loading = 0;
  public item: NewItem;
  public parent: APIItem;
  public parentSpec: APISpec = null;
  public invalidParams: any;
  public vehicleTypeIDs: number[] = [];

  constructor(
    private http: HttpClient,
    private specService: SpecService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.item = {
      produced_exactly: false,
      is_concept: 'inherited',
      spec_id: 'inherited',
      item_type_id: undefined,
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
      lat: undefined,
      lng: undefined
    };

    this.querySub = this.route.queryParams
      .pipe(
        debounceTime(30),
        distinctUntilChanged(),
        switchMap(params => {
          this.item.item_type_id = parseInt(params.item_type_id, 10);

          if (
            [1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(this.item.item_type_id) === -1
          ) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }

          this.loading++;

          return this.itemService
            .getItem(params.parent_id, {
              fields: 'is_concept,name_html,spec_id'
            })
            .pipe(
              switchMap(
                parent => {
                  const specId = parent ? parent.spec_id : null;

                  if (!specId || !Number.isInteger(specId as number)) {
                    return of({
                      item: parent,
                      spec: null as APISpec
                    });
                  }

                  return this.specService.getSpec(specId as number).pipe(
                    map(spec => ({ item: parent, spec: spec }))
                  );
                }
              ),
              switchMap(
                parent => {
                  if (
                    parent.item &&
                    (parent.item.item_type_id === 1 ||
                      parent.item.item_type_id === 4)
                  ) {
                    return this.http
                      .get<APIItemVehicleTypeGetResponse>(
                        '/api/item-vehicle-type',
                        {
                          params: {
                            item_id: parent.item.id.toString()
                          }
                        }
                      )
                      .pipe(
                        map(response => {
                          const ids: number[] = [];
                          for (const row of response.items) {
                            ids.push(row.vehicle_type_id);
                          }

                          return ids;
                        }),
                        map(vehicleTypeIDs => ({
                          item: parent.item,
                          spec: parent.spec,
                          vehicleTypeIDs: vehicleTypeIDs
                        }))
                      );
                  }
                  return of({
                    item: parent.item,
                    spec: parent.spec,
                    vehicleTypeIDs: [] as number[]
                  });
                }
              ),
              finalize(() => this.loading--),
              map(data => ({
                item: data.item,
                spec: data.spec,
                vehicleTypeIDs: data.vehicleTypeIDs,
                itemTypeID: params.item_type_id
              }))
            );
        })
      )
      .subscribe(data => {
        this.parent = data.item;
        this.parentSpec = data.spec;
        this.vehicleTypeIDs = data.vehicleTypeIDs;
        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                isAdminPage: true,
                needRight: false
              },
              name: 'item/type/' + data.itemTypeID + '/new-item',
              pageId: 163
            }),
          0
        );
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public submit() {
    this.loading++;

    const data = {
      item_type_id: this.item.item_type_id,
      name: this.item.name,
      full_name: this.item.full_name,
      catname: this.item.catname,
      body: this.item.body,
      spec_id: this.item.spec_id,
      begin_model_year: this.item.begin_model_year,
      end_model_year: this.item.end_model_year,
      begin_year: this.item.begin_year,
      begin_month: this.item.begin_month,
      end_year: this.item.end_year,
      end_month: this.item.end_month,
      today: this.item.today,
      produced: this.item.produced,
      produced_exactly: this.item.produced_exactly,
      is_concept: this.item.is_concept,
      is_group: this.item.is_group,
      lat: this.item.lat,
      lng: this.item.lng
    };

    this.http
      .post<void>('/api/item', data, {
        observe: 'response'
      })
      .pipe(
        catchError(response => {
          if (response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else {
            this.toastService.response(response);
          }
          return EMPTY;
        }),
        switchMap(response =>
          this.itemService.getItemByLocation(
            response.headers.get('Location'),
            {}
          )
        ),
        switchMap(
          item =>
            forkJoin([
              this.itemService.setItemVehicleTypes(
                item.id,
                this.vehicleTypeIDs
              ),
              this.parent
                ? this.http.post<void>('/api/item-parent', {
                    parent_id: this.parent.id,
                    item_id: item.id
                  })
                : of(null)
            ]).pipe(
              map(() => item)
            )
        )
      )
      .subscribe(
        item => {
          this.router.navigate(['/moder/items/item', item.id]);
        },
        () => {},
        () => this.loading--
      );
  }
}
