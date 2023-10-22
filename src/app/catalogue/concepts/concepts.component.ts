import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-concepts',
  templateUrl: './concepts.component.html',
})
export class CatalogueConceptsComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient.list(
        new ListItemsRequest({
          catname,
          fields: new ItemFields({
            nameHtml: true,
            nameOnly: true,
          }),
          language: this.languageService.language,
          limit: 1,
        }),
      );
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
          title: $localize`${brand.nameOnly} concepts & prototypes`,
        });
      }
    }),
    shareReplay(1),
  );

  protected readonly data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      this.itemService.getItems$({
        ancestor_id: +brand.id,
        concept: true,
        concept_inherit: false,
        fields: [
          'name_html,name_default,description,has_text,produced,accepted_pictures_count',
          'design,engine_vehicles,route,categories.name_html',
          'can_edit_specs,specs_route',
          'twins_groups',
          'childs_count,total_pictures,preview_pictures.picture.name_text',
        ].join(','),
        limit: 7,
        order: 'age',
        page,
        route_brand_id: +brand.id,
      }),
    ),
    map((response) => {
      const items: CatalogueListItem[] = response.items.map((item) => {
        const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
          picture: picture ? picture.picture : null,
          routerLink:
            item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : [],
          thumb: picture ? picture.thumb : null,
        }));

        return {
          accepted_pictures_count: item.accepted_pictures_count,
          can_edit_specs: item.can_edit_specs,
          categories: item.categories,
          childs_counts: null,
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
          specsRouterLink: null, // TODO
        };
      });

      return {
        items,
        paginator: response.paginator,
      };
    }),
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.nameOnly} concepts & prototypes`));

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
