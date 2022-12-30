import {Component, OnInit, OnDestroy} from '@angular/core';
import {APIPaginator, APIService} from '../../../../services/api.service';
import {ItemService, APIItem} from '../../../../services/item';
import {chunk} from '../../../../chunk';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription, combineLatest} from 'rxjs';
import {ItemParentService, APIItemParent} from '../../../../services/item-parent';
import {PageEnvService} from '../../../../services/page-env.service';
import {ToastsService} from '../../../../toasts/toasts.service';

export interface APIItemInSelectParent extends APIItem {
  childLinks: APIItemParent[];
  open: boolean;
}

@Component({
  selector: 'app-moder-items-item-select-parent',
  templateUrl: './select-parent.component.html',
})
export class ModerItemsItemSelectParentComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public showCatalogueTab = false;
  public showBrandsTab = false;
  public showTwinsTab = false;
  public showFactoriesTab = false;
  public tab: string;
  public brandID: number;
  public paginator: APIPaginator;
  public page: number;
  public search = '';
  public item: APIItem;
  public brands: APIItem[][];
  public items: any[];
  public categories: APIItem[];
  public factories: APIItem[];

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemParentService: ItemParentService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  private loadChildItems(parent: APIItemInSelectParent, order: string) {
    this.itemParentService
      .getItems({
        limit: 100,
        fields: 'item.name_html,item.childs_count',
        parent_id: parent.id,
        is_group: true,
        order,
      })
      .subscribe({
        next: (response) => {
          parent.childLinks = response.items;
        },
        error: (response) => this.toastService.response(response),
      });
  }

  public loadChildCategories(parent: APIItemInSelectParent) {
    this.loadChildItems(parent, 'categories_first');
  }

  public loadChildCatalogues(parent: APIItemInSelectParent) {
    this.loadChildItems(parent, 'type_auto');
  }

  ngOnInit(): void {
    this.paramsSub = combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(([route, query]) => {
      this.tab = query.get('tab') || 'catalogue';
      this.page = parseInt(query.get('page'), 10);
      this.brandID = parseInt(query.get('brand_id'), 10);

      this.itemService
        .getItem(parseInt(route.get('id'), 10), {
          fields: 'name_text,name_html',
        })
        .subscribe(
          (item) => {
            this.item = item;

            this.pageEnv.set({
              layout: {isAdminPage: true},
              pageId: 144,
            });

            this.showCatalogueTab = [1, 2, 5].indexOf(this.item.item_type_id) > -1;
            this.showBrandsTab = [1, 2, 5].indexOf(this.item.item_type_id) > -1;
            this.showTwinsTab = this.item.item_type_id === 1;
            this.showFactoriesTab = [1, 2].indexOf(this.item.item_type_id) > -1;

            if (this.tab === 'catalogue') {
              if (this.brandID) {
                this.itemParentService
                  .getItems({
                    limit: 100,
                    fields: 'item.name_html,item.childs_count',
                    parent_id: this.brandID,
                    is_group: true,
                    item_type_id: this.item.item_type_id,
                    page: this.page,
                  })
                  .subscribe({
                    next: (response) => {
                      this.items = response.items;
                      this.paginator = response.paginator;
                    },
                    error: (response) => this.toastService.response(response),
                  });
              } else {
                this.loadCatalogueBrands();
              }
            }

            if (this.tab === 'brands') {
              this.loadBrands();
            }

            if (this.tab === 'categories') {
              this.itemService
                .getItems({
                  type_id: 3,
                  limit: 100,
                  fields: 'name_html,childs_count',
                  page: this.page,
                  no_parent: true,
                })
                .subscribe({
                  next: (response) => {
                    this.categories = response.items;
                    this.paginator = response.paginator;
                  },
                  error: (response) => this.toastService.response(response),
                });
            }

            if (this.tab === 'twins') {
              if (this.brandID) {
                this.itemService
                  .getItems({
                    type_id: 4,
                    limit: 100,
                    fields: 'name_html',
                    have_common_childs_with: this.brandID,
                    page: this.page,
                  })
                  .subscribe({
                    next: (response) => {
                      this.items = response.items;
                      this.paginator = response.paginator;
                    },
                    error: (response) => this.toastService.response(response),
                  });
              } else {
                this.itemService
                  .getItems({
                    type_id: 5,
                    limit: 500,
                    fields: 'name_html',
                    have_childs_with_parent_of_type: 4,
                    page: this.page,
                  })
                  .subscribe({
                    next: (response) => {
                      this.brands = chunk<APIItem>(response.items, 6);
                      this.paginator = response.paginator;
                    },
                    error: (response) => this.toastService.response(response),
                  });
              }
            }

            if (this.tab === 'factories') {
              this.itemService
                .getItems({
                  type_id: 6,
                  limit: 100,
                  fields: 'name_html',
                  page: this.page,
                })
                .subscribe({
                  next: (response) => {
                    this.factories = response.items;
                    this.paginator = response.paginator;
                  },
                  error: (response) => this.toastService.response(response),
                });
            }
          },
          () => {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true,
            });
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  public select(parent: APIItem) {
    this.api
      .request<void>('POST', 'item-parent', {
        body: {
          item_id: this.item.id,
          parent_id: parent.id,
        },
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/moder/items/item', this.item.id], {
            queryParams: {
              tab: 'catalogue',
            },
          });
        },
        error: (response) => this.toastService.response(response),
      });

    return false;
  }

  public doSearch() {
    if (this.tab === 'brands') {
      this.loadBrands();
    }

    if (this.tab === 'catalogue') {
      if (!this.brandID) {
        this.loadCatalogueBrands();
      }
    }
  }

  private loadCatalogueBrands() {
    this.itemService
      .getItems({
        type_id: 5,
        limit: 500,
        fields: 'name_html',
        have_childs_of_type: this.item.item_type_id,
        name: this.search ? '%' + this.search + '%' : null,
        page: this.page,
      })
      .subscribe({
        next: (response) => {
          this.brands = chunk<APIItem>(response.items, 6);
          this.paginator = response.paginator;
        },
        error: (response) => this.toastService.response(response),
      });
  }

  private loadBrands() {
    this.itemService
      .getItems({
        type_id: 5,
        limit: 500,
        fields: 'name_html',
        name: this.search ? '%' + this.search + '%' : null,
        page: this.page,
      })
      .subscribe({
        next: (response) => {
          this.brands = chunk<APIItem>(response.items, 6);
          this.paginator = response.paginator;
        },
        error: (response) => this.toastService.response(response),
      });
  }
}
