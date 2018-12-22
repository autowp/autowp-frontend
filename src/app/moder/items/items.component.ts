import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import {
  VehicleTypeService,
  APIVehicleType
} from '../../services/vehicle-type';
import { SpecService, APISpec } from '../../services/spec';
import {
  ItemService,
  APIItem,
  GetItemsServiceOptions
} from '../../services/item';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  Observable,
  of,
  empty
} from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {
  tap,
  switchMap,
  distinctUntilChanged,
  debounceTime,
  catchError,
  map
} from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

// Acl.inheritsRole('moder', 'unauthorized');

interface APIVehicleTypeInItems extends APIVehicleType {
  deep?: number;
}

interface APISpecInItems extends APISpec {
  deep?: number;
}

function toPlainVehicleType(
  options: APIVehicleTypeInItems[],
  deep: number
): any[] {
  const result: APIVehicleTypeInItems[] = [];
  for (const item of options) {
    item.deep = deep;
    result.push(item);
    for (const subitem of toPlainVehicleType(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

function toPlainSpec(options: APISpecInItems[], deep: number): any[] {
  const result: APISpecInItems[] = [];
  for (const item of options) {
    item.deep = deep;
    result.push(item);
    for (const subitem of toPlainSpec(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

const DEFAULT_ORDER = 'id_desc';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
@Injectable()
export class ModerItemsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;

  public loading = 0;
  public items: APIItem[] = [];
  public paginator: APIPaginator;
  public vehicleTypeOptions: APIVehicleTypeInItems[] = [];
  public specOptions: APISpecInItems[] = [];
  private vehicleTypeSub: Subscription;
  private specsSub: Subscription;

  public name = '';

  public nameExclude = '';

  public itemTypeID = 0;

  public vehicleTypeID: number | null | string = null;

  public vehicleChildsTypeID: number | null = null;

  public specID: number | null = null;

  public noParent: boolean = null;

  public text = '';

  public fromYear: number | null = null;

  public toYear: number | null = null;

  public order: string = DEFAULT_ORDER;

  public ancestorID: number;
  public ancestorQuery = '';
  public ancestorsDataSource: (text$: Observable<string>) => Observable<any[]>;

  public listMode: boolean;

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private specService: SpecService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private pageEnv: PageEnvService
  ) {
    this.ancestorsDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap(query => {
          if (query === '') {
            return of([]);
          }

          const params: GetItemsServiceOptions = {
            limit: 10,
            fields: 'name_text,name_html',
            id: 0,
            name: ''
          };
          if (query.substring(0, 1) === '#') {
            params.id = parseInt(query.substring(1), 10);
          } else {
            params.name = '%' + query + '%';
          }

          return this.itemService.getItems(params).pipe(
            catchError((err, caught) => {
              console.log(err, caught);
              return empty();
            }),
            map(response => response.items)
          );
        })
      );
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: 'page/131/name',
          pageId: 131
        }),
      0
    );

    this.vehicleTypeSub = this.vehicleTypeService
      .getTypes()
      .subscribe(types => {
        this.vehicleTypeOptions = toPlainVehicleType(types, 0);
      });

    this.specsSub = this.specService.getSpecs().subscribe(types => {
      this.specOptions = toPlainSpec(types, 0);
    });

    this.querySub = this.route.queryParams
      .pipe(
        map(params => ({
          name: params.name || ('' as string),
          nameExclude: params.name_exclude || ('' as string),
          itemTypeID: parseInt(params.item_type_id, 10) as number,
          vehicleTypeID:
            params.vehicle_type_id === 'empty'
              ? 'empty'
              : parseInt(params.vehicle_type_id, 10) || null,
          vehicleChildsTypeID:
            parseInt(params.vehicle_childs_type_id, 10) || null,
          specID: parseInt(params.spec_id, 10) || null,
          noParent: params.no_parent ? true : false,
          text: params.text || '',
          fromYear: parseInt(params.from_year, 10) || null,
          toYear: parseInt(params.to_year, 10) || null,
          order: params.order || DEFAULT_ORDER,
          ancestorID: parseInt(params.ancestor_id, 10) || null,
          listMode: params.list_mode ? true : false,
          page: parseInt(params.page, 10) || 1
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        tap(params => {
          this.name = params.name;
          this.nameExclude = params.nameExclude;
          this.itemTypeID = params.itemTypeID;
          this.vehicleTypeID = params.vehicleTypeID;
          this.vehicleChildsTypeID = params.vehicleChildsTypeID;
          this.specID = params.specID;
          this.noParent = params.noParent;
          this.text = params.text;
          this.fromYear = params.fromYear;
          this.toYear = params.toYear;
          this.order = params.order;
          this.ancestorID = params.ancestorID;
          this.listMode = params.listMode;
        }),
        switchMap(params => {
          this.loading = 1;
          this.items = [];

          let fields = 'name_html';
          let limit = 500;
          if (!params.listMode) {
            fields = [
              'name_html,name_default,description,has_text,produced',
              'design,engine_vehicles',
              'url,can_edit_specs,specs_url,more_pictures_url',
              'categories.url,categories.name_html,twins_groups',
              'preview_pictures.picture.thumb_medium,preview_pictures.url,childs_count,total_pictures'
            ].join(',');
            limit = 10;
          }

          return this.itemService.getItems({
            name: params.name ? params.name + '%' : null,
            name_exclude: params.nameExclude ? params.nameExclude + '%' : null,
            type_id: params.itemTypeID,
            vehicle_type_id: params.vehicleTypeID,
            vehicle_childs_type_id: params.vehicleChildsTypeID,
            spec: params.specID,
            order: params.order,
            no_parent: params.noParent ? true : null,
            text: params.text ? params.text : null,
            from_year: params.fromYear ? params.fromYear : null,
            to_year: params.toYear ? params.toYear : null,
            ancestor_id: params.ancestorID ? params.ancestorID : null,
            page: params.page,
            fields: fields,
            limit: limit
          });
        }),
        tap(() => (this.loading = 0))
      )
      .subscribe(response => {
        this.items = response.items;
        this.paginator = response.paginator;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.vehicleTypeSub.unsubscribe();
    this.specsSub.unsubscribe();
  }

  public ancestorFormatter(x: APIItem) {
    return x.name_text;
  }

  public ancestorOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        ancestor_id: e.item.id
      }
    });
  }

  public clearAncestor(): void {
    this.ancestorQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        ancestor_id: null
      }
    });
  }

  public onNameChanged() {
    this.router.navigate([], {
      queryParams: {
        name: this.name.length ? this.name : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onNameExcludeChanged() {
    this.router.navigate([], {
      queryParams: {
        name_exclude: this.nameExclude.length ? this.nameExclude : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onItemTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        item_type_id: this.itemTypeID ? this.itemTypeID : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onVehicleTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        vehicle_type_id: this.vehicleTypeID ? this.vehicleTypeID : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onVehicleChildsTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        vehicle_childs_type_id: this.vehicleChildsTypeID
          ? this.vehicleChildsTypeID
          : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onSpecChanged() {
    this.router.navigate([], {
      queryParams: {
        spec_id: this.specID ? this.specID : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onNoParentChanged() {
    this.router.navigate([], {
      queryParams: {
        no_parent: this.noParent ? '1' : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onTextChanged() {
    this.router.navigate([], {
      queryParams: {
        text: this.text ? this.text : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onFromYearChanged() {
    this.router.navigate([], {
      queryParams: {
        from_year: this.fromYear ? this.fromYear : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onToYearChanged() {
    this.router.navigate([], {
      queryParams: {
        to_year: this.toYear ? this.toYear : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }

  public onOrderChanged() {
    this.router.navigate([], {
      queryParams: {
        order: this.order ? this.order : null,
        page: null
      },
      queryParamsHandling: 'merge'
    });
  }
}
