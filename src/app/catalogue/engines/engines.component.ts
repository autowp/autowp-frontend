import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemFields, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {EMPTY, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-engines',
  templateUrl: './engines.component.html',
})
export class CatalogueEnginesComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly brand$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient
        .list(
          new ListItemsRequest({
            catname,
            fields: new ItemFields({
              nameHtml: true,
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
          })
        )
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
        title: $localize`${brand.nameOnly} Engines`,
      });
    }),
    shareReplay(1)
  );

  protected readonly data$ = combineLatest([this.brand$, this.page$]).pipe(
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
          item_type_id: ItemType.ITEM_TYPE_ENGINE,
          limit: 7,
          order: 'type_auto',
          page,
          parent_id: +brand.id,
        }),
        of(brand),
      ])
    ),
    map(([response, brand]) => {
      const items: CatalogueListItem[] = response.items.map((item) => {
        const routerLink = ['/', brand.catname, item.catname];

        const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map((picture) => ({
          picture: picture ? picture.picture : null,
          routerLink: picture && picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : [],
          thumb: picture ? picture.thumb : null,
        }));

        return {
          accepted_pictures_count: item.item.accepted_pictures_count,
          can_edit_specs: item.item.can_edit_specs,
          childs_counts: item.item.childs_counts,
          description: item.item.description,
          design: null,
          details: {
            count: item.item.childs_count,
            routerLink,
          },
          engine_vehicles: item.item.engine_vehicles,
          has_text: item.item.has_text,
          id: item.item.id,
          item_type_id: item.item.item_type_id,
          name_default: item.item.name_default,
          name_html: item.item.name_html,
          picturesRouterLink: routerLink.concat(['pictures']),
          preview_pictures: {
            large_format: item.item.preview_pictures.large_format,
            pictures,
          },
          produced: item.item.produced,
          produced_exactly: item.item.produced_exactly,
          specsRouterLink:
            item.item.has_specs || item.item.has_child_specs ? routerLink.concat(['specifications']) : null,
        };
      });

      return {
        items,
        paginator: response.paginator,
      };
    })
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.nameOnly} Engines`));

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly itemParentService: ItemParentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService
  ) {}
}
