import { Component} from '@angular/core';
import { ItemService } from '../../services/item';
import {combineLatest, EMPTY, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import { PageEnvService } from '../../services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, catchError, map, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {CatalogueListItemPicture} from '../../utils/list-item/list-item.component';
import {ItemType} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-factory-items',
  templateUrl: './items.component.html'
})
export class FactoryItemsComponent {
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public factory$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(id => this.itemService.getItem(id, {
      fields: ['name_text', 'name_html', 'lat', 'lng', 'description'].join(',')
    })),
    catchError(err => {
      this.toastService.response(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }),
    switchMap(factory => {
      if (factory.item_type_id !== ItemType.ITEM_TYPE_FACTORY) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }

      this.pageEnv.set({
        layout: {
          needRight: true
        },
        pageId: 182
      });

      return of(factory);
    }),
    shareReplay(1)
  );

  public items$ = combineLatest([this.page$, this.factory$]).pipe(
    switchMap(([page, factory]) => this.itemService.getItems({
      related_groups_of: factory.id,
      page,
      limit: 10,
      fields: [
        'name_html,name_default,description,has_text,produced',
        'design,engine_vehicles,route',
        'url,can_edit_specs,specs_route',
        'categories.name_html,twins_groups',
        'preview_pictures.picture.name_text,preview_pictures.route,childs_count,accepted_pictures_count'
      ].join(',')
    })),
    catchError(err => {
      this.toastService.response(err);
      return EMPTY;
    }),
    map(data => ({
      paginator: data.paginator,
      items: data.items.map(item => {
        const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map(picture => ({
          picture: picture ? picture.picture : null,
          thumb: picture ? picture.thumb : null,
          routerLink: item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : []
        }));

        return {
          id: item.id,
          preview_pictures: {
            pictures,
            large_format: item.preview_pictures.large_format
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
          picturesRouterLink: ['/factories', '' + item.id, 'pictures'],
          specsRouterLink: item.has_specs || item.has_child_specs && item.route ? item.route.concat(['specifications']) : null,
          details: {
            routerLink: item.route,
            count: item.childs_count
          },
          childs_counts: null
        };
      })
    }))
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private acl: ACLService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
