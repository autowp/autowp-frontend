import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Spec, VehicleType} from '@grpc/spec.pb';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {APIPaginator} from '@services/api.service';
import {APIItem, GetItemsServiceOptions, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {SpecService} from '@services/spec';
import {VehicleTypeService} from '@services/vehicle-type';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {getVehicleTypeTranslation} from '@utils/translations';
import {EMPTY, Observable, Subscription, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

interface APIVehicleTypeInItems {
  deep?: number;
  id: number;
  name: string;
}

interface APISpecInItems extends Spec {
  deep?: number;
}

function toPlainVehicleType(options: VehicleType[], deep: number): APIVehicleTypeInItems[] {
  const result: APIVehicleTypeInItems[] = [];
  for (const item of options) {
    result.push({
      deep,
      id: item.id,
      name: getVehicleTypeTranslation(item.name),
    });
    for (const subitem of toPlainVehicleType(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

function toPlainSpec(options: APISpecInItems[], deep: number): APISpecInItems[] {
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
  templateUrl: './items.component.html',
})
export class ModerItemsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;

  protected loading = 0;
  protected items: CatalogueListItem[] = [];
  protected paginator: APIPaginator;
  protected vehicleTypeOptions: APIVehicleTypeInItems[] = [];
  protected specOptions: APISpecInItems[] = [];
  private vehicleTypeSub: Subscription;
  private specsSub: Subscription;

  protected name = '';

  protected nameExclude = '';

  protected itemTypeID = 0;

  protected vehicleTypeID: null | number | string = null;

  protected vehicleChildsTypeID: null | number = null;

  protected specID: null | number = null;

  protected noParent: boolean = null;

  protected text = '';

  protected fromYear: null | number = null;

  protected toYear: null | number = null;

  protected order: string = DEFAULT_ORDER;

  protected ancestorID: number;
  protected ancestorQuery = '';
  protected ancestorsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        const params: GetItemsServiceOptions = {
          fields: 'name_text,name_html',
          id: 0,
          limit: 10,
          name: '',
        };
        if (query.substring(0, 1) === '#') {
          params.id = parseInt(query.substring(1), 10);
        } else {
          params.name = '%' + query + '%';
        }

        return this.itemService.getItems$(params).pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return EMPTY;
          }),
          map((response) => response.items),
        );
      }),
    );

  protected listMode: boolean;

  constructor(
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly specService: SpecService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 131,
        }),
      0,
    );

    this.vehicleTypeSub = this.vehicleTypeService.getTypes$().subscribe((types) => {
      this.vehicleTypeOptions = toPlainVehicleType(types, 0);
    });

    this.specsSub = this.specService.getSpecs$().subscribe((types) => {
      this.specOptions = toPlainSpec(types, 0);
    });

    this.querySub = this.route.queryParamMap
      .pipe(
        map((params) => ({
          ancestorID: parseInt(params.get('ancestor_id'), 10) || null,
          fromYear: parseInt(params.get('from_year'), 10) || null,
          itemTypeID: parseInt(params.get('item_type_id'), 10),
          listMode: !!params.get('list_mode'),
          name: params.get('name') || '',
          nameExclude: params.get('name_exclude') || '',
          noParent: !!params.get('no_parent'),
          order: params.get('order') || DEFAULT_ORDER,
          page: parseInt(params.get('page'), 10) || 1,
          specID: parseInt(params.get('spec_id'), 10) || null,
          text: params.get('text') || '',
          toYear: parseInt(params.get('to_year'), 10) || null,
          vehicleChildsTypeID: parseInt(params.get('vehicle_childs_type_id'), 10) || null,
          vehicleTypeID:
            params.get('vehicle_type_id') === 'empty' ? 'empty' : parseInt(params.get('vehicle_type_id'), 10) || null,
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        tap((params) => {
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
        switchMap((params) => {
          this.loading = 1;
          this.items = [];

          let fields = 'name_html';
          let limit = 500;
          if (!params.listMode) {
            fields = [
              'name_html,name_default,description,has_text,produced,route',
              'design,engine_vehicles',
              'url,can_edit_specs,specs_route',
              'categories.name_html,twins_groups',
              'childs_count,total_pictures,preview_pictures.picture.name_text',
            ].join(',');
            limit = 10;
          }

          return this.itemService.getItems$({
            ancestor_id: params.ancestorID ? params.ancestorID : null,
            fields,
            from_year: params.fromYear ? params.fromYear : null,
            limit,
            name: params.name ? params.name + '%' : null,
            name_exclude: params.nameExclude ? params.nameExclude + '%' : null,
            no_parent: params.noParent ? true : null,
            order: params.order,
            page: params.page,
            spec: params.specID,
            text: params.text ? params.text : null,
            to_year: params.toYear ? params.toYear : null,
            type_id: params.itemTypeID,
            vehicle_childs_type_id: params.vehicleChildsTypeID,
            vehicle_type_id: params.vehicleTypeID,
          });
        }),
        tap(() => (this.loading = 0)),
      )
      .subscribe((response) => {
        this.items = response.items.map((item) => {
          const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
            picture: picture ? picture.picture : null,
            routerLink: picture && picture.picture ? ['/picture', picture.picture.identity] : null,
            thumb: picture ? picture.thumb : null,
          }));

          return {
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
            categories: item.categories,
            childs_counts: item.childs_counts,
            description: item.description,
            design: item.design,
            details: {
              count: item.childs_count,
              routerLink: item.route,
            },
            engine_vehicles: item.engine_vehicles,
            has_text: item.has_text,
            id: item.id,
            item_type_id: item.item_type_id,
            name_default: item.name_default,
            name_html: item.name_html,
            picturesRouterLink: item.route ? item.route.concat(['pictures']) : null,
            preview_pictures: {
              large_format: item.preview_pictures.large_format,
              pictures,
            },
            produced: item.produced,
            produced_exactly: item.produced_exactly,
            specsRouterLink: item.has_specs || item.has_child_specs ? item.specs_route : null,
            twins_groups: item.twins_groups,
          };
        });

        this.paginator = response.paginator;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.vehicleTypeSub.unsubscribe();
    this.specsSub.unsubscribe();
  }

  protected ancestorFormatter(x: APIItem) {
    return x.name_text;
  }

  protected ancestorOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        ancestor_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearAncestor(): void {
    this.ancestorQuery = '';
    this.router.navigate([], {
      queryParams: {
        ancestor_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onNameChanged() {
    this.router.navigate([], {
      queryParams: {
        name: this.name.length ? this.name : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onNameExcludeChanged() {
    this.router.navigate([], {
      queryParams: {
        name_exclude: this.nameExclude.length ? this.nameExclude : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onItemTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        item_type_id: this.itemTypeID ? this.itemTypeID : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onVehicleTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        vehicle_type_id: this.vehicleTypeID ? this.vehicleTypeID : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onVehicleChildsTypeChanged() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        vehicle_childs_type_id: this.vehicleChildsTypeID ? this.vehicleChildsTypeID : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onSpecChanged() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        spec_id: this.specID ? this.specID : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onNoParentChanged() {
    this.router.navigate([], {
      queryParams: {
        no_parent: this.noParent ? '1' : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onTextChanged() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        text: this.text ? this.text : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onFromYearChanged() {
    this.router.navigate([], {
      queryParams: {
        from_year: this.fromYear ? this.fromYear : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onToYearChanged() {
    this.router.navigate([], {
      queryParams: {
        page: null,
        to_year: this.toYear ? this.toYear : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onOrderChanged() {
    this.router.navigate([], {
      queryParams: {
        order: this.order ? this.order : null,
        page: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
