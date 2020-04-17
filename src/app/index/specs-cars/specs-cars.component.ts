import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {APIUser} from '../../services/user';
import {chunkBy} from '../../chunk';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';
import {APIItem} from '../../services/item';
import { APIService } from '../../services/api.service';

interface APIIndexSpecItemsItem extends APIItem {
  contributors: APIUser[];
}

interface APIIndexSpecItemsResponse {
  items: APIIndexSpecItemsItem[];
}

interface SpecsCatalogueListItem extends CatalogueListItem {
  contributors?: APIUser[];
}

@Component({
  selector: 'app-index-specs-cars',
  templateUrl: './specs-cars.component.html'
})
@Injectable()
export class IndexSpecsCarsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public items: SpecsCatalogueListItem[][];

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.sub = this.api.request<APIIndexSpecItemsResponse>('GET', 'index/spec-items').subscribe(response => {

      const items: SpecsCatalogueListItem[] = [];

      for (const item of response.items) {

        const pictures: CatalogueListItemPicture[] = [];
        for (const picture of item.preview_pictures.pictures) {
          pictures.push({
            picture: picture ? picture.picture : null,
            thumb: picture ? picture.thumb : null,
            routerLink: picture && picture.picture ? [...item.route, 'pictures', picture.picture.identity] : []
          });
        }
        items.push({
          id: item.id,
          preview_pictures: {
            pictures,
            large_format: false
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
            count: item.childs_count
          },
          childs_counts: item.childs_counts,
          categories: item.categories,
          twins_groups: item.twins_groups,
          contributors: item.contributors
        });
      }

      this.items = chunkBy(items, 2);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
