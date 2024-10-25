import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ItemType, PictureItemType} from '@grpc/spec.pb';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {
  CatalogueListItem,
  CatalogueListItemComponent,
  CatalogueListItemPicture,
} from '@utils/list-item/list-item.component';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, CatalogueListItemComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-cutaway-brands',
  standalone: true,
  templateUrl: './brands.component.html',
})
export class CutawayBrandsComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly query$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.itemService.getItems$({
        descendant_pictures: {
          perspective_id: 9,
          status: 'accepted',
          type_id: PictureItemType.PICTURE_ITEM_CONTENT,
        },
        fields:
          'name_html,name_default,description,has_text,preview_pictures.route,preview_pictures.picture.name_text,current_pictures_count',
        limit: 12,
        page,
        preview_pictures: {
          perspective_id: 9,
          type_id: PictureItemType.PICTURE_ITEM_CONTENT,
        },
        type_id: ItemType.ITEM_TYPE_BRAND,
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: this.prepareItems(response.items),
      paginator: response.paginator,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 201}), 0);
  }

  private prepareItems(items: APIItem[]): CatalogueListItem[] {
    return items.map((item) => {
      const itemRouterLink = ['/cutaway/brands', item.catname];

      const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
        picture: picture?.picture ? picture.picture : null,
        routerLink: picture.picture ? ['/picture', picture.picture.identity] : undefined,
        thumb: picture ? picture.thumb : null,
      }));

      return {
        accepted_pictures_count: item.accepted_pictures_count,
        can_edit_specs: false,
        childs_counts: null,
        description: item.description,
        design: null,
        details: {
          count: item.current_pictures_count || 0,
          routerLink: itemRouterLink,
        },
        engine_vehicles: undefined,
        has_text: !!item.has_text,
        id: item.id,
        item_type_id: item.item_type_id,
        name_default: item.name_default,
        name_html: item.name_html,
        picturesRouterLink: itemRouterLink,
        preview_pictures: {
          large_format: item.preview_pictures.large_format,
          pictures,
        },
        produced: null,
        produced_exactly: null,
        specsRouterLink: null,
      };
    });
  }
}
