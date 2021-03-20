import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';


@Component({
  selector: 'app-catalogue-concepts',
  templateUrl: './concepts.component.html'
})
@Injectable()
export class CatalogueConceptsComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
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
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      tap(brand => {
        this.brand = brand;
        if (brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            pageId: 37,
            nameTranslated: $localize `${brand.name_text} concepts & prototypes`
          });
        }
      }),
      switchMap(brand =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand,
            page: parseInt(queryParams.get('page'), 10)
          }))
        )
      ),
      switchMap(data =>
        this.itemService.getItems({
          limit: 7,
          order: 'age',
          ancestor_id: data.brand.id,
          concept: true,
          concept_inherit: false,
          route_brand_id: data.brand.id,
          fields: [
            'name_html,name_default,description,has_text,produced,accepted_pictures_count',
            'design,engine_vehicles,route,categories.name_html',
            'can_edit_specs,specs_route',
            'twins_groups',
            'childs_count,total_pictures,preview_pictures.picture.name_text'
          ].join(','),
          page: data.page
        })
      ),
      map(response => {
        const items: CatalogueListItem[] = response.items.map(item => {

          const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map(picture => ({
            picture: picture ? picture.picture : null,
            thumb: picture ? picture.thumb : null,
            routerLink: item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : []
          }));

          return {
            id: item.id,
            preview_pictures: {
              pictures,
              large_format: item.preview_pictures.large_format
            },
            item_type_id: item.item_type_id,
            produced: item.produced,
            produced_exactly: item.produced_exactly,
            name_html: item.name_html,
            name_default: item.name_default,
            design: item.design,
            description: item.description,
            engine_vehicles: item.engine_vehicles,
            has_text: item.has_text,
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
            picturesRouterLink: item.route ? item.route.concat(['pictures']) : null,
            specsRouterLink: null, // TODO
            details: {
              routerLink: item.route,
              count: item.childs_count
            },
            childs_counts: null,
            categories: item.categories
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
