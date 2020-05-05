import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {EMPTY, of, Subscription} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {ItemParentService} from '../../services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';

@Component({
  selector: 'app-catalogue-engines',
  templateUrl: './engines.component.html'
})
@Injectable()
export class CatalogueEnginesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub = this.getBrand().pipe(
      switchMap(brand => {
        this.brand = brand;
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 208,
          name: 'page/208/ng-name',
          args: {
            brand: brand.name_text,
          }
        });

        return this.getPage().pipe(
          map(page => ({
            brand,
            page
          }))
        );
      }),
      switchMap(data =>
        this.itemParentService
          .getItems({
            fields: [
              'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
              'item.engine_vehicles',
              'item.can_edit_specs,item.specs_route',
              'item.twins_groups',
              'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text'
            ].join(','),
            item_type_id: 2,
            limit: 7,
            page: data.page,
            parent_id: data.brand.id,
            order: 'type_auto'
          })
      ),
      map(response => {
        const items: CatalogueListItem[] = response.items.map(item => {

          const routerLink = ['/', this.brand.catname, item.catname];

          const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map(picture => ({
            picture: picture ? picture.picture : null,
            thumb: picture ? picture.thumb : null,
            routerLink: picture && picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : []
          }));

          return {
            id: item.item.id,
            preview_pictures: {
              pictures,
              large_format: item.item.preview_pictures.large_format
            },
            item_type_id: item.item.item_type_id,
            produced: item.item.produced,
            produced_exactly: item.item.produced_exactly,
            name_html: item.item.name_html,
            name_default: item.item.name_default,
            design: null,
            description: item.item.description,
            engine_vehicles: item.item.engine_vehicles,
            has_text: item.item.has_text,
            accepted_pictures_count: item.item.accepted_pictures_count,
            can_edit_specs: item.item.can_edit_specs,
            picturesRouterLink: routerLink.concat(['pictures']),
            specsRouterLink: item.item.has_specs || item.item.has_child_specs ? routerLink.concat(['specifications']) : null,
            details: {
              routerLink,
              count: item.item.childs_count
            },
            childs_counts: item.item.childs_counts
          };
        });

        return {
          items,
          paginator: response.paginator
        };
      })
    ).subscribe(response => {
      this.items = response.items;
      this.paginator = response.paginator;
    });
  }

  private getBrand() {
    return this.route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname,
          fields: 'name_text,name_html',
          limit: 1
        }).pipe(
          switchMap(response => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true
              });
              return EMPTY;
            }
            return of(response.items[0]);
          })
        );
      })
    );
  }

  private getPage() {
    return this.route.queryParamMap.pipe(
      map(params => +params.get('page')),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
