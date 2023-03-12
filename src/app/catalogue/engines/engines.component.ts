import {Component} from '@angular/core';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, of} from 'rxjs';
import {ItemParentService} from '@services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';

@Component({
  selector: 'app-catalogue-engines',
  templateUrl: './engines.component.html',
})
export class CatalogueEnginesComponent {
  public page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public brand$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService
        .getItems$({
          catname,
          fields: 'name_html,name_only',
          limit: 1,
        })
        .pipe(
          switchMap((response) => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true,
              });
              return EMPTY;
            }
            return of(response.items[0]);
          })
        );
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 208,
        title: $localize`${brand.name_only} Engines`,
      });
    }),
    shareReplay(1)
  );

  public data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      combineLatest([
        this.itemParentService.getItems$({
          fields: [
            'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
            'item.engine_vehicles',
            'item.can_edit_specs,item.specs_route',
            'item.twins_groups',
            'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text',
          ].join(','),
          item_type_id: 2,
          limit: 7,
          page,
          parent_id: brand.id,
          order: 'type_auto',
        }),
        of(brand),
      ])
    ),
    map(([response, brand]) => {
      const items: CatalogueListItem[] = response.items.map((item) => {
        const routerLink = ['/', brand.catname, item.catname];

        const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map((picture) => ({
          picture: picture ? picture.picture : null,
          thumb: picture ? picture.thumb : null,
          routerLink: picture && picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : [],
        }));

        return {
          id: item.item.id,
          preview_pictures: {
            pictures,
            large_format: item.item.preview_pictures.large_format,
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
          specsRouterLink:
            item.item.has_specs || item.item.has_child_specs ? routerLink.concat(['specifications']) : null,
          details: {
            routerLink,
            count: item.item.childs_count,
          },
          childs_counts: item.item.childs_counts,
        };
      });

      return {
        items,
        paginator: response.paginator,
      };
    })
  );

  public title$ = this.brand$.pipe(map((brand) => $localize`${brand.name_only} Engines`));

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
