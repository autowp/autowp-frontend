import {Component} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';

@Component({
  selector: 'app-catalogue-concepts',
  templateUrl: './concepts.component.html',
})
export class CatalogueConceptsComponent {
  private page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService.getItems$({
        catname,
        fields: 'name_only,name_html',
        limit: 1,
      });
    }),
    map((response) => (response && response.items.length ? response.items[0] : null)),
    switchMap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(brand);
    }),
    tap((brand) => {
      if (brand) {
        this.pageEnv.set({
          pageId: 37,
          title: $localize`${brand.name_only} concepts & prototypes`,
        });
      }
    }),
    shareReplay(1)
  );

  public data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      this.itemService.getItems$({
        limit: 7,
        order: 'age',
        ancestor_id: brand.id,
        concept: true,
        concept_inherit: false,
        route_brand_id: brand.id,
        fields: [
          'name_html,name_default,description,has_text,produced,accepted_pictures_count',
          'design,engine_vehicles,route,categories.name_html',
          'can_edit_specs,specs_route',
          'twins_groups',
          'childs_count,total_pictures,preview_pictures.picture.name_text',
        ].join(','),
        page,
      })
    ),
    map((response) => {
      const items: CatalogueListItem[] = response.items.map((item) => {
        const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
          picture: picture ? picture.picture : null,
          thumb: picture ? picture.thumb : null,
          routerLink:
            item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : [],
        }));

        return {
          id: item.id,
          preview_pictures: {
            pictures,
            large_format: item.preview_pictures.large_format,
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
            count: item.childs_count,
          },
          childs_counts: null,
          categories: item.categories,
        };
      });

      return {
        items,
        paginator: response.paginator,
      };
    })
  );

  public title$ = this.brand$.pipe(map((brand) => $localize`${brand.name_only} concepts & prototypes`));

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
