import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPaginator} from '../../services/api.service';
import {CatalogueListItem, CatalogueListItemPicture} from '../list-item/list-item.component';


@Component({
  selector: 'app-catalogue-concepts',
  templateUrl: './concepts.component.html'
})
@Injectable()
export class CatalogueConceptsComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
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
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      tap(brand => {
        this.brand = brand;
        if (brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            pageId: 37,
            name: 'page/37/ng-name',
            args: {
              brand: brand.name_text,
            }
          });
        }
      }),
      switchMap(brand =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand: brand,
            queryParams: queryParams
          }))
        )
      ),
      switchMap(data =>
        this.itemService.getItems({
          limit: 7,
          order: 'age',
          ancestor_id: data.brand.id,
          concept: true,
          concept_inherit: false,
          fields: [
            'catname,name_html,name_default,description,has_text,produced,accepted_pictures_count',
            'design,engine_vehicles',
            'can_edit_specs,specs_url',
            'twins_groups',
            'preview_pictures.picture.thumb_medium,childs_count,total_pictures,preview_pictures.picture.name_text'
          ].join(','),
          page: +data.queryParams.get('page')
        })
      ),
      map(response => {
        const items: CatalogueListItem[] = [];

        const routerLink = ['/', this.brand.catname, 'concepts'];

        for (const item of response.items) {

          const pictures: CatalogueListItemPicture[] = [];
          for (const picture of item.preview_pictures) {
            pictures.push({
              picture: picture.picture,
              routerLink: picture.picture ? routerLink.concat(['pictures', picture.picture.identity]) : []
            });
          }
          items.push({
            id: item.id,
            preview_pictures: pictures,
            item_type_id: item.item_type_id,
            produced: item.produced,
            produced_exactly: item.produced_exactly,
            name_html: item.name_html,
            name_default: item.name_default,
            design: item.design,
            description: item.description,
            engine_vehicles: item.engine_vehicles,
            has_text: item.has_text,
            childs_count: item.childs_count,
            accepted_pictures_count: item.accepted_pictures_count,
            can_edit_specs: item.can_edit_specs,
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
