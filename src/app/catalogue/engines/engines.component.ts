import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ItemFields, ItemListOptions, ItemsRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {CatalogueListItemComponent} from '@utils/list-item/list-item.component';
import {combineLatest, EMPTY, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';

@Component({
  imports: [RouterLink, CatalogueListItemComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-catalogue-engines',
  templateUrl: './engines.component.html',
})
export class CatalogueEnginesComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemParentService = inject(ItemParentService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
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
          new ItemsRequest({
            fields: new ItemFields({
              nameHtml: true,
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname,
            }),
          }),
        )
        .pipe(
          switchMap((response) => {
            if (!response.items || response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true,
              });
              return EMPTY;
            }
            return of(response.items[0]);
          }),
        );
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 208,
        title: $localize`${brand.nameOnly} Engines`,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
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
      ]),
    ),
    map(([response, brand]) => {
      const items: CatalogueListItem[] = response.items.map((item) => {
        const routerLink = ['/', brand.catname, item.catname];

        const pictures: CatalogueListItemPicture[] = item.item.preview_pictures.pictures.map((picture) => ({
          picture: picture?.picture ? picture.picture : null,
          routerLink: picture?.picture ? routerLink.concat(['pictures', picture.picture.identity]) : [],
          thumb: picture ? picture.thumb : null,
        }));

        return {
          accepted_pictures_count: item.item.accepted_pictures_count,
          can_edit_specs: !!item.item.can_edit_specs,
          childs_counts: item.item.childs_counts ? item.item.childs_counts : null,
          description: item.item.description,
          design: null,
          details: {
            count: item.item.childs_count,
            routerLink,
          },
          engine_vehicles: item.item.engine_vehicles,
          has_text: !!item.item.has_text,
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
    }),
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.nameOnly} Engines`));
}
