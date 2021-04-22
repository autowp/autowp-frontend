import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
  Observable,
  of,
  forkJoin,
  combineLatest, EMPTY
} from 'rxjs';
import {
  APIPictureItem,
  PictureItemService
} from '../../../../../services/picture-item';
import { APIItem, ItemService } from '../../../../../services/item';
import { PageEnvService } from '../../../../../services/page-env.service';
import { APIItemVehicleTypeGetResponse, APIService } from '../../../../../services/api.service';
import {
  switchMap,
  catchError,
  distinctUntilChanged,
  debounceTime,
  tap, map
} from 'rxjs/operators';

interface APIPictureItemInOrganizePictures extends APIPictureItem {
  selected?: boolean;
}

@Component({
  selector: 'app-moder-items-item-pictures-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./styles.scss']
})
export class ModerItemsItemPicturesOrganizeComponent
  implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public item: APIItem;
  public newItem: any = null;
  public hasSelectedPicture = false;
  public loading = 0;
  public pictures: APIPictureItemInOrganizePictures[];
  public invalidParams: any;
  public vehicleTypeIDs: number[] = [];

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureItemService: PictureItemService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id =>
          combineLatest([
            this.itemService
              .getItem(id, {
                fields: [
                  'name_text',
                  'name',
                  'is_concept',
                  'name_default',
                  'subscription',
                  'begin_year',
                  'begin_month',
                  'end_year',
                  'end_month',
                  'today',
                  'begin_model_year',
                  'end_model_year',
                  'produced',
                  'spec_id',
                  'full_name',
                  'catname',
                  'lat',
                  'lng'
                ].join(',')
              })
              .pipe(
                tap(item => {
                  this.item = item;
                  this.newItem = Object.assign({}, item);
                  this.newItem.is_group = false;

                  this.pageEnv.set({
                    layout: {
                      isAdminPage: true,
                      needRight: false
                    },
                    nameTranslated: 'Organize pictures',
                    pageId: 78
                  });
                }),
                switchMap(() =>
                  this.item.item_type_id === 1 || this.item.item_type_id === 4
                    ? this.api
                        .request<APIItemVehicleTypeGetResponse>(
                          'GET',
                          'item-vehicle-type',
                          {
                            params: {
                              item_id: this.item.id.toString()
                            }
                          }
                        )
                        .pipe(
                          tap(response => {
                            this.vehicleTypeIDs = response.items.map(row => row.vehicle_type_id);
                          })
                        )
                    : of(null)
                )
              ),
            this.pictureItemService
              .getItems({
                item_id: id,
                limit: 500,
                fields: 'picture.thumb_medium,picture.name_text',
                order: 'status'
              })
              .pipe(tap(response => (this.pictures = response.items)))
          ])
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public pictureSelected(picture: APIPictureItemInOrganizePictures) {
    picture.selected = !picture.selected;
    let result = false;
    for (const ipicture of this.pictures) {
      if (ipicture.selected) {
        result = true;
      }
    }

    this.hasSelectedPicture = result;
  }

  public submit() {
    this.loading++;

    const data = {
      item_type_id: this.newItem.item_type_id,
      name: this.newItem.name,
      full_name: this.newItem.full_name,
      catname: this.newItem.catname,
      body: this.newItem.body,
      spec_id: this.newItem.spec_id,
      begin_model_year: this.newItem.begin_model_year,
      end_model_year: this.newItem.end_model_year,
      begin_year: this.newItem.begin_year,
      begin_month: this.newItem.begin_month,
      end_year: this.newItem.end_year,
      end_month: this.newItem.end_month,
      today: this.newItem.today,
      produced: this.newItem.produced,
      produced_exactly: this.newItem.produced_exactly,
      is_concept: this.newItem.is_concept,
      is_group: this.newItem.is_group,
      lat: this.newItem.lat,
      lng: this.newItem.lng
    };

    forkJoin([
      this.api.request<void>('POST', 'item', {
        body: data,
        observe: 'response'
      }),
      this.item.is_group
        ? of(null)
        : this.api.request<void>('PUT', 'item/' + this.item.id, {body: {
            is_group: true
          }})
    ])
      .pipe(
        catchError(response => {
          this.invalidParams = response.error.invalid_params;
          this.loading--;
          return EMPTY;
        }),
        switchMap(responses =>
          this.itemService.getItemByLocation(
            responses[0].headers.get('Location'),
            {}
          )
        ),
        switchMap(response => {
          const subpromises: Observable<any>[] = [
            this.itemService.setItemVehicleTypes(
              response.id,
              this.vehicleTypeIDs
            ),
            this.api.request<void>('POST', 'item-parent', {body: {
              parent_id: this.item.id,
              item_id: response.id
            }})
          ];

          for (const picture of this.pictures) {
            if (picture.selected) {
              subpromises.push(
                this.api.request<void>(
                  'PUT',
                  'picture-item/' + picture.picture_id + '/' + picture.item_id + '/' + picture.type,
                  {body: {
                    item_id: response.id
                  }}
                )
              );
            }
          }

          return forkJoin(subpromises).pipe(
            map(() => response)
          );
        })
      )
      .subscribe(item => {
        this.loading--;
        if (localStorage) {
          localStorage.setItem('last_item', item.id.toString());
        }
        this.router.navigate(['/moder/items/item', item.id], {
          queryParams: {
            tab: 'pictures'
          }
        });
      });
  }
}
