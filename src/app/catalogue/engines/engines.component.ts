import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of, OperatorFunction, Subscription} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {APIItemParent, ItemParentService} from '../../services/item-parent';
import {CatalogueListItem, CatalogueListItemPicture} from '../list-item/list-item.component';

interface Parent {
  id: number;
  path: string[];
  items: APIItemParent[];
}

type ParentObservableFunc = () => OperatorFunction<Parent, Parent>;

@Component({
  selector: 'app-catalogue-engines',
  templateUrl: './engines.component.html'
})
@Injectable()
export class CatalogueEnginesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;
  public path: APIItemParent[] = [];

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private itemParentService: ItemParentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    const pathPipeRecursive: ParentObservableFunc = () =>  switchMap((parent: Parent) => {
        console.log('switchMap', parent);
        if (! parent.id || parent.path.length <= 0) {
          return of(parent);
        }

        return this.itemParentService.getItems({
          parent_id: parent.id,
          catname: parent.path[0],
          limit: 1,
          fields: 'item.name_html'
        }).pipe(
          map(response => {
            console.log('got', response.items);
            if (response.items.length <= 0) {
              return EMPTY;
            }
            const parentItem = response.items[0];

            const obj: Parent = {
              id: parentItem.item_id,
              path: parent.path.splice(1),
              items: parent.items.concat([parentItem])
            };

            return obj;
          }),
          pathPipeRecursive()
        );
      });


    this.sub = this.route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname: catname,
          fields: 'catname,name_text,name_html',
          limit: 1
        }).pipe(
          map(response => response && response.items.length ? response.items[0] : null),
          tap(brand => {
            this.brand = brand;
            if (brand) {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                pageId: 208,
                name: 'page/208/ng-name',
                args: {
                  brand: brand.name_text,
                }
              });
            }
          })
        );
      }),
      switchMap(brand =>
        this.route.paramMap.pipe(
          map(params => params.get('path')),
          distinctUntilChanged(),
          debounceTime(10),
          map(path => (<Parent>{
            id: brand.id,
            path: path ? path.split('/') : [],
            items: []
          })),
          pathPipeRecursive(),
          map(parent => ({
            brand: brand,
            path: parent.items
          }))
        )
      ),
      switchMap(params =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand: params.brand,
            path: params.path,
            queryParams: queryParams
          }))
        )
      ),
      tap(data => {
        this.path = data.path;
      }),
      switchMap(data =>
        this.itemParentService
          .getItems({
            fields: [
              'item.catname,item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
              'item.engine_vehicles',
              'item.can_edit_specs,item.specs_url',
              'item.twins_groups',
              'item.preview_pictures.picture.thumb_medium,item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text'
            ].join(','),
            item_type_id: 2,
            limit: 7,
            page: +data.queryParams.get('page'),
            parent_id: data.path.length > 0 ? data.path[0].item_id : data.brand.id,
            order: 'type_auto'
          })
      ),
      map(response => {
        const items: CatalogueListItem[] = [];

        for (const item of response.items) {

          const routerLink = ['/', this.brand.catname, 'engines', item.catname];

          const pictures: CatalogueListItemPicture[] = [];
          for (const picture of item.item.preview_pictures) {
            pictures.push({
              picture: picture.picture,
              routerLink: picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : []
            });
          }
          items.push({
            id: item.item.id,
            preview_pictures: pictures,
            item_type_id: item.item.item_type_id,
            produced: item.item.produced,
            produced_exactly: item.item.produced_exactly,
            name_html: item.item.name_html,
            name_default: item.item.name_default,
            design: null,
            description: item.item.description,
            engine_vehicles: item.item.engine_vehicles,
            has_text: item.item.has_text,
            childs_count: item.item.childs_count,
            accepted_pictures_count: item.item.accepted_pictures_count,
            can_edit_specs: item.item.can_edit_specs,
            routerLink: routerLink,
            picturesRouterLink: routerLink.concat(['pictures'])
          });
        }

        return {
          items: items,
          paginator: response.paginator
        };
      })
    ).subscribe(response => {
      this.items = response.items;
      this.paginator = response.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
