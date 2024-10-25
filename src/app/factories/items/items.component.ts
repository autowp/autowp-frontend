import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {CatalogueListItem, CatalogueListItemPicture} from '@utils/list-item/list-item.component';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';
import {CatalogueListItemComponent} from '../../utils/list-item/list-item.component';

@Component({
  imports: [RouterLink, CatalogueListItemComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-factory-items',
  standalone: true,
  templateUrl: './items.component.html',
})
export class FactoryItemsComponent {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly acl = inject(ACLService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly factory$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'name_html', 'lat', 'lng', 'description'].join(','),
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((factory) => {
      if (!factory || factory.item_type_id !== ItemType.ITEM_TYPE_FACTORY) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      this.pageEnv.set({pageId: 182});

      return of(factory);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly items$ = combineLatest([this.page$, this.factory$]).pipe(
    switchMap(([page, factory]) =>
      this.itemService.getItems$({
        fields: [
          'name_html,name_default,description,has_text,produced',
          'design,engine_vehicles,route',
          'url,can_edit_specs,specs_route',
          'categories.name_html,twins_groups',
          'preview_pictures.picture.name_text,preview_pictures.route,childs_count,accepted_pictures_count',
        ].join(','),
        limit: 10,
        page,
        related_groups_of: factory.id,
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((data) => ({
      items: data.items.map((item) => {
        const pictures: CatalogueListItemPicture[] = item.preview_pictures.pictures.map((picture) => ({
          picture: picture?.picture ? picture.picture : null,
          routerLink:
            item.route && picture && picture.picture ? item.route.concat(['pictures', picture.picture.identity]) : [],
          thumb: picture ? picture.thumb : null,
        }));

        return {
          accepted_pictures_count: item.accepted_pictures_count,
          can_edit_specs: item.can_edit_specs,
          childs_counts: null,
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
          picturesRouterLink: ['/factories', '' + item.id, 'pictures'],
          preview_pictures: {
            large_format: item.preview_pictures.large_format,
            pictures,
          },
          produced: item.produced,
          produced_exactly: item.produced_exactly,
          specsRouterLink:
            item.has_specs || (item.has_child_specs && item.route) ? item.route.concat(['specifications']) : null,
        } as CatalogueListItem;
      }),
      paginator: data.paginator,
    })),
  );
}
