import {Component, OnInit} from '@angular/core';
import {EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {APIItem, ItemService} from '@services/item';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-cutaway-authors',
  templateUrl: './authors.component.html',
})
export class CutawayAuthorsComponent implements OnInit {
  public query$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.itemService.getItems$({
        fields:
          'name_html,name_default,description,has_text,preview_pictures.route,preview_pictures.picture.name_text,total_pictures',
        type_id: ItemType.ITEM_TYPE_PERSON,
        descendant_pictures: {
          type_id: 2,
          status: 'accepted',
          contains_perspective_id: 9,
        },
        preview_pictures: {
          type_id: 2,
          contains_perspective_id: 9,
        },
        page,
        limit: 12,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: this.prepareItems(response.items),
      paginator: response.paginator,
    }))
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 201}), 0);
  }

  private prepareItems(items: APIItem[]): CatalogueListItem[] {
    return items.map((item) => {
      const itemRouterLink = ['/persons'];
      itemRouterLink.push(item.id.toString());

      const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
        picture: picture ? picture.picture : null,
        thumb: picture ? picture.thumb : null,
        routerLink: picture && picture.picture ? itemRouterLink.concat([picture.picture.identity]) : [],
      }));

      return {
        id: item.id,
        preview_pictures: {
          pictures,
          large_format: item.preview_pictures.large_format,
        },
        item_type_id: item.item_type_id,
        produced: null,
        produced_exactly: null,
        name_html: item.name_html,
        name_default: item.name_default,
        design: null,
        description: item.description,
        engine_vehicles: null,
        has_text: item.has_text,
        accepted_pictures_count: item.accepted_pictures_count,
        can_edit_specs: false,
        picturesRouterLink: itemRouterLink,
        specsRouterLink: null,
        details: {
          routerLink: itemRouterLink,
          count: item.childs_count,
        },
        childs_counts: null,
      };
    });
  }
}
