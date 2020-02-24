import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../services/api.service';
import { ItemService, APIItem } from '../services/item';
import {combineLatest, Subscription} from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {CatalogueListItem, CatalogueListItemPicture} from '../catalogue/list-item/list-item.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
@Injectable()
export class PersonsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public paginator: APIPaginator;
  public items: CatalogueListItem[];
  public authors = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          name: 'page/214/name',
          pageId: 214
        }),
      0
    );

    this.querySub = combineLatest([
      this.route.queryParams.pipe(
        map(params => parseInt(params.page, 10))
      ),
      this.route.data.pipe(
        map(params => !!params.authors)
      )
    ])
      .pipe(
        map(params => ({
          authors: params[1],
          page: params[0]
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        tap(params => {
          this.authors = params.authors;
        }),
        switchMap(params => this.getPictures(params.authors, params.page))
      )
      .subscribe(data => {
        this.items = this.prepareItems(data.items);
        this.paginator = data.paginator;
      });
  }

  getPictures(authors: boolean, page: number) {

    const fields = 'name_html,name_default,description,has_text,preview_pictures.route,preview_pictures.picture.name_text,total_pictures';

    if (authors) {
      return this.itemService.getItems({
        type_id: 8,
        fields: fields,
        descendant_pictures: {
          status: 'accepted',
          type_id: 2
        },
        preview_pictures: {
          type_id: 2
        },
        order: 'name',
        limit: 10,
        page: page
      });
    }
    return this.itemService.getItems({
      type_id: 8,
      fields: fields,
      descendant_pictures: {
        status: 'accepted',
        type_id: 1
      },
      preview_pictures: {
        type_id: 1
      },
      order: 'name',
      limit: 10,
      page: page
    });
  }

  prepareItems(items: APIItem[]): CatalogueListItem[] {
    const result: CatalogueListItem[] = [];

    for (const item of items) {

      const itemRouterLink = ['/persons'];
      itemRouterLink.push(item.id.toString());

      const pictures: CatalogueListItemPicture[] = [];
      for (const picture of item.preview_pictures.pictures) {
        pictures.push({
          picture: picture.picture,
          thumb: picture.thumb,
          routerLink: picture.picture ? itemRouterLink.concat([picture.picture.identity]) : []
        });
      }
      result.push({
        id: item.id,
        preview_pictures: {
          pictures: pictures,
          large_format: item.preview_pictures.large_format
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
          count: item.childs_count
        }
      });
    }

    return result;
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
