import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPicture} from '../../services/picture';
import {APIPaginator} from '../../services/api.service';


@Component({
  selector: 'app-catalogue-logotypes',
  templateUrl: './concepts.component.html'
})
@Injectable()
export class CatalogueConceptsComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: APIItem[];
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
          fields: [
            'catname,name_html,name_default,description,has_text,produced,accepted_pictures_count',
            'design,engine_vehicles',
            'can_edit_specs,specs_url',
            'twins_groups',
            'preview_pictures.picture.thumb_medium,childs_count,total_pictures,preview_pictures.picture.name_text'
          ].join(','),
          page: +data.queryParams.get('page')
        })
      )
    ).subscribe(response => {
      this.items = response.items;
      this.paginator = response.paginator;
    });
  }

  public pictureRouterLink(picture: APIPicture): string[] {
    return ['/', this.brand.catname, 'concepts', picture.identity];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
