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
  tap
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-factory-items',
  templateUrl: './items.component.html'
})
@Injectable()
export class FactoryItemsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public factory: APIItem;
  public items: APIItem[] = [];
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
        catchError((err, caught) => {
          this.toastService.response(err);
          this.router.navigate(['/error-404']);
          return EMPTY;
        }),
        tap(factory => {
          if (factory.item_type_id !== 6) {
            this.router.navigate(['/error-404']);
            return;
          }

          this.pageEnv.set({
            layout: {
              needRight: true
            },
            name: 'page/182/name',
            pageId: 182,
            args: {
              FACTORY_ID: factory.id + '',
              FACTORY_NAME: factory.name_text
            }
          });
        }),
        switchMap(
          factory =>
            this.route.queryParams.pipe(
              distinctUntilChanged(),
              debounceTime(30)
            ),
          (factory, params) => ({ factory, params })
        ),
        switchMap(
          data =>
            this.itemService.getItems({
              related_groups_of: data.factory.id,
              page: data.params.page,
              limit: 10,
              fields: [
                'name_html,name_default,description,has_text,produced',
                'design,engine_vehicles',
                'url,can_edit_specs,specs_url,more_pictures_url',
                'categories.url,categories.name_html,twins_groups',
                'preview_pictures.picture.thumb_medium,preview_pictures.url,childs_count,total_pictures'
              ].join(',')
            }),
          (data, response) => ({
            factory: data.factory,
            items: response.items,
            paginator: response.paginator
          })
        ),
        catchError((err, caught) => {
          this.toastService.response(err);
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.factory = data.factory;
        this.items = data.items;
        this.paginator = data.paginator;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.aclSub.unsubscribe();
  }
}
