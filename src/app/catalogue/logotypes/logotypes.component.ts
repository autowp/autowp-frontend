import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPicture, PictureService} from '../../services/picture';
import {chunk, chunkBy} from '../../chunk';
import {APIPaginator} from '../../services/api.service';


@Component({
  selector: 'app-catalogue-logotypes',
  templateUrl: './logotypes.component.html'
})
@Injectable()
export class CatalogueLogotypesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  private aclSub: Subscription;
  public pictures: APIPicture[][];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService
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
        }).pipe(
          map(response => response && response.items.length ? response.items[0] : null),
          tap(brand => {
            this.brand = brand;
            if (brand) {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                pageId: 39,
                name: 'page/39/ng-name',
                args: {
                  brand: brand.name_text,
                }
              });
            }
          })
        );
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
        this.pictureService.getPictures({
          limit: 12,
          status: 'accepted',
          order: 3,
          exact_item_id: data.brand.id,
          perspective_id: 22,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          page: +data.queryParams.get('page')
        })
      )
    ).subscribe(response => {
      this.pictures = chunkBy(response.pictures, 4);
      this.paginator = response.paginator;
    });
  }

  public pictureRouterLink(picture: APIPicture): string[] {
    return ['/', this.brand.catname, 'logotypes', picture.identity];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.aclSub.unsubscribe();
  }

  public chunk<T>(a: T[], count: number) {
    return chunk(a, count);
  }
}
