import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
})
export class PersonsComponent implements OnInit {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly authors$ = this.route.data.pipe(
    map((params) => !!params.authors),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly data$ = combineLatest([this.page$, this.authors$]).pipe(
    switchMap(([page, authors]) => {
      const fields =
        'name_html,name_default,description,has_text,preview_pictures.route,preview_pictures.picture.name_text,total_pictures';

      if (authors) {
        return this.itemService.getItems$({
          descendant_pictures: {
            status: 'accepted',
            type_id: 2,
          },
          fields,
          limit: 10,
          order: 'name',
          page,
          preview_pictures: {
            type_id: 2,
          },
          type_id: ItemType.ITEM_TYPE_PERSON,
        });
      }
      return this.itemService.getItems$({
        descendant_pictures: {
          status: 'accepted',
          type_id: 1,
        },
        fields,
        limit: 10,
        order: 'name',
        page,
        preview_pictures: {
          type_id: 1,
        },
        type_id: ItemType.ITEM_TYPE_PERSON,
      });
    }),
    map((response) => ({
      items: this.prepareItems(response.items),
      paginator: response.paginator,
    })),
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 214}), 0);
  }

  private prepareItems(items: APIItem[]): CatalogueListItem[] {
    return items.map((item) => {
      const itemRouterLink = ['/persons'];
      itemRouterLink.push(item.id.toString());

      const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
        picture: picture ? picture.picture : null,
        routerLink: picture && picture.picture ? itemRouterLink.concat([picture.picture.identity]) : [],
        thumb: picture ? picture.thumb : null,
      }));

      return {
        accepted_pictures_count: item.accepted_pictures_count,
        can_edit_specs: false,
        childs_counts: null,
        description: item.description,
        design: null,
        details: {
          count: item.childs_count,
          routerLink: itemRouterLink,
        },
        engine_vehicles: null,
        has_text: item.has_text,
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
