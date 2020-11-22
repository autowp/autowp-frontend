import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {APIItem, ItemService} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIItemVehicleTypeGetResponse, APIService} from '../../../../services/api.service';
import {EMPTY, forkJoin, Subscription} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-moder-items-item-meta',
  templateUrl: './meta.component.html'
})
@Injectable()
export class ModerItemsItemMetaComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() item: APIItem;

  public loading = 0;

  public canEditMeta = false;
  public vehicleTypeIDs: number[] = [];
  public invalidParams: any;
  private aclSub: Subscription;

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemService: ItemService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      if (this.item.item_type_id === 1 || this.item.item_type_id === 4) {
        this.loading++;
        this.api
          .request<APIItemVehicleTypeGetResponse>('GET', 'item-vehicle-type', {
            params: {
              item_id: this.item.id.toString()
            }
          })
          .subscribe(
            response => {
              this.vehicleTypeIDs = response.items.map(row => row.vehicle_type_id);

              this.loading--;
            },
            () => {
              this.loading--;
            }
          );
      }
    }
  }

  ngOnInit(): void {
    this.aclSub = this.acl
      .isAllowed(Resource.CAR, Privilege.EDIT_META)
      .subscribe(allow => (this.canEditMeta = allow));
  }

  ngOnDestroy(): void {
    this.aclSub.unsubscribe();
  }

  public saveMeta() {
    this.loading++;

    const data = {
      // item_type_id: this.$state.params.item_type_id,
      name: this.item.name,
      full_name: this.item.full_name,
      catname: this.item.catname,
      body: this.item.body,
      spec_id: this.item.spec_id,
      begin_model_year: this.item.begin_model_year,
      end_model_year: this.item.end_model_year,
      begin_model_year_fraction: this.item.begin_model_year_fraction,
      end_model_year_fraction: this.item.end_model_year_fraction,
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

    forkJoin([
      this.api.request<void>('PUT', 'item/' + this.item.id, {body: data}).pipe(
        catchError(response => {
          this.invalidParams = response.error.invalid_params;
          return EMPTY;
        }),
        tap(() => (this.invalidParams = {}))
      ),
      this.itemService.setItemVehicleTypes(this.item.id, this.vehicleTypeIDs)
    ]).subscribe(() => {}, () => {}, () => this.loading--);
  }
}
