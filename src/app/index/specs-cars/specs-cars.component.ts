import {Component} from '@angular/core';
import {APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {APIUser} from '@services/user';
import {CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {map} from 'rxjs/operators';

import {chunkBy} from '../../chunk';

interface APIIndexSpecItemsItem extends APIItem {
  contributors: APIUser[];
}

interface APIIndexSpecItemsResponse {
  items: APIIndexSpecItemsItem[];
}

@Component({
  selector: 'app-index-specs-cars',
  templateUrl: './specs-cars.component.html',
})
export class IndexSpecsCarsComponent {
  protected readonly items$ = this.api.request<APIIndexSpecItemsResponse>('GET', 'index/spec-items').pipe(
    map((response) => {
      return chunkBy(
        response.items.map((item) => {
          const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
            picture: picture?.picture ? picture.picture : null,
            routerLink: picture && picture.picture ? [...item.route, 'pictures', picture.picture.identity] : [],
            thumb: picture ? picture.thumb : null,
          }));

          return {
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
            categories: item.categories,
            childs_counts: item.childs_counts,
            contributors: item.contributors,
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
          };
        }),
        2,
      );
    }),
  );

  constructor(private readonly api: APIService) {}
}
