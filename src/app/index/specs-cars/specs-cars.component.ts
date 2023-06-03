import {Component} from '@angular/core';
import {APIUser} from '@services/user';
import {chunkBy} from '../../chunk';
import {CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {APIItem} from '@services/item';
import {APIService} from '@services/api.service';
import {map} from 'rxjs/operators';

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
            picture: picture ? picture.picture : null,
            thumb: picture ? picture.thumb : null,
            routerLink: picture && picture.picture ? [...item.route, 'pictures', picture.picture.identity] : [],
          }));

          return {
            id: item.id,
            preview_pictures: {
              pictures,
              large_format: false,
            },
            item_type_id: item.item_type_id,
            produced: item.produced,
            produced_exactly: item.produced_exactly,
            name_html: item.name_html,
            name_default: item.name_default,
            design: item.design,
            description: item.description,
            engine_vehicles: item.engine_vehicles,
            has_text: item.has_text,
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
            picturesRouterLink: item.route.concat(['pictures']),
            specsRouterLink: item.specs_route,
            details: {
              routerLink: item.route,
              count: item.childs_count,
            },
            childs_counts: item.childs_counts,
            categories: item.categories,
            twins_groups: item.twins_groups,
            contributors: item.contributors,
          };
        }),
        2
      );
    })
  );

  constructor(private readonly api: APIService) {}
}
