import {Component, OnInit} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {combineLatest} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit {
  private page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public authors$ = this.route.data.pipe(
    map((params) => !!params.authors),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public data$ = combineLatest([this.page$, this.authors$]).pipe(
    switchMap(([page, authors]) => {
      const fields =
        'name_html,name_default,description,has_text,preview_pictures.route,preview_pictures.picture.name_text,total_pictures';

      if (authors) {
        return this.itemService.getItems$({
          type_id: ItemType.ITEM_TYPE_PERSON,
          fields,
          descendant_pictures: {
            status: 'accepted',
            type_id: 2,
          },
          preview_pictures: {
            type_id: 2,
          },
          order: 'name',
          limit: 10,
          page,
        });
      }
      return this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_PERSON,
        fields,
        descendant_pictures: {
          status: 'accepted',
          type_id: 1,
        },
        preview_pictures: {
          type_id: 1,
        },
        order: 'name',
        limit: 10,
        page,
      });
    }),
    map((response) => ({
      items: this.prepareItems(response.items),
      paginator: response.paginator,
    }))
  );

  constructor(private itemService: ItemService, private route: ActivatedRoute, private pageEnv: PageEnvService) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 214}), 0);
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
