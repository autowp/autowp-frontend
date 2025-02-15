import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIUser} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {UserService} from '@services/user';
import {
  CatalogueListItem,
  CatalogueListItemComponent,
  CatalogueListItemPicture,
} from '@utils/list-item/list-item.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {chunkBy} from '../../chunk';
import {UserComponent} from '../../user/user/user.component';

interface APIIndexSpecItemsItem extends APIItem {
  contributors: number[];
}

interface APIIndexSpecItemsResponse {
  items: APIIndexSpecItemsItem[];
}

interface ListItem extends CatalogueListItem {
  contributors: Observable<APIUser | null>[];
}

@Component({
  imports: [RouterLink, CatalogueListItemComponent, UserComponent, AsyncPipe],
  selector: 'app-index-specs-cars',
  templateUrl: './specs-cars.component.html',
})
export class IndexSpecsCarsComponent {
  readonly #api = inject(APIService);
  readonly #userService = inject(UserService);

  protected readonly items$ = this.#api.request$<APIIndexSpecItemsResponse>('GET', 'index/spec-items').pipe(
    map((response) => {
      return chunkBy(
        response.items.map((item) => {
          const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
            picture: picture?.picture ? picture.picture : null,
            routerLink: picture?.picture ? [...item.route, 'pictures', picture.picture.identity] : [],
            thumb: picture ? picture.thumb : null,
          }));

          return {
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
            categories: item.categories,
            childs_counts: item.childs_counts,
            contributors: item.contributors.map((contributor) => this.#userService.getUser$('' + contributor)),
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
            picturesRouterLink: item.route.concat(['pictures']),
            preview_pictures: {
              large_format: false,
              pictures,
            },
            produced: item.produced,
            produced_exactly: item.produced_exactly,
            specsRouterLink: item.specs_route,
            twins_groups: item.twins_groups,
          } as ListItem;
        }),
        2,
      );
    }),
  );
}
