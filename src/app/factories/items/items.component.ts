import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { APIItem, ItemService } from '../../services/item';
import {Subscription, EMPTY} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ACLService } from '../../services/acl.service';
import { PageEnvService } from '../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  tap, map
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {CatalogueListItem, CatalogueListItemPicture} from '../../utils/list-item/list-item.component';

@Component({
  selector: 'app-factory-items',
  templateUrl: './items.component.html'
})
@Injectable()
export class FactoryItemsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public factory: APIItem;
  public items: CatalogueListItem[] = [];
  public paginator: APIPaginator;
  public isModer = false;
  private aclSub: Subscription;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private acl: ACLService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    this.routeSub = this.route.params
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params =>
          this.itemService.getItem(params.id, {
            fields: [
              'name_text',
              'name_html',
              'lat',
              'lng',
              'description'
            ].join(',')
          })
        ),
        catchError(err => {
          this.toastService.response(err);
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }),
        tap(factory => {
          if (factory.item_type_id !== 6) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return;
          }

          this.pageEnv.set({
            layout: {
              needRight: true
            },
            name: 'page/182/name',
            pageId: 182
          });
        }),
        switchMap(factory => this.route.queryParams.pipe(
          distinctUntilChanged(),
          debounceTime(30),
          map(params => ({ factory, params }))
        )),
        switchMap(data => this.itemService.getItems({
          related_groups_of: data.factory.id,
          page: data.params.page,
          limit: 10,
          fields: [
            'name_html,name_default,description,has_text,produced',
            'design,engine_vehicles,route',
            'url,can_edit_specs,specs_route',
            'categories.name_html,twins_groups',
            'preview_pictures.picture.name_text,preview_pictures.route,childs_count,accepted_pictures_count'
          ].join(',')
        }).pipe(
          map(response => ({
            factory: data.factory,
            items: response.items,
            paginator: response.paginator
          }))
        )),
        catchError(err => {
          this.toastService.response(err);
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.factory = data.factory;
        this.paginator = data.paginator;

        this.items = data.items.map(item => {

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
        });

      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.aclSub.unsubscribe();
  }
}
