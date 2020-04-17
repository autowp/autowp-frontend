import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable, of, Subscription} from 'rxjs';
import {APIPicture, PictureService} from '../../services/picture';
import {chunkBy} from '../../chunk';
import {APIPaginator} from '../../services/api.service';
import {BrandPerspectivePageData} from '../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed',
  templateUrl: './mixed.component.html'
})
@Injectable()
export class CatalogueMixedComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public pictures: APIPicture[][];
  public paginator: APIPaginator;
  public data: BrandPerspectivePageData;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router
  ) {
  }

  private getBrand(): Observable<APIItem> {
    return this.route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }
        return this.itemService.getItems({
          catname: catname,
          fields: 'name_text,name_html',
          limit: 1
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      switchMap(brand => {
        if (!brand) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }
        return of(brand);
      })
    );
  }

  ngOnInit(): void {

    this.sub = combineLatest([
      this.getBrand(),
      this.route.data as Observable<BrandPerspectivePageData>
    ]).pipe(
      tap(params => {
        const brand = params[0];
        const data = params[1];

        this.data = data;
        this.brand = brand;
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: data.page_id,
          name: data.title,
          args: {
            brand: brand.name_text,
          }
        });
      }),
      switchMap(data =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand: data[0],
            data: data[1],
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
          perspective_id: data.data.perspective_id,
          perspective_exclude_id: data.data.perspective_exclude_id,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          page: +data.queryParams.get('page')
        })
      )
    ).subscribe(response => {
      this.pictures = chunkBy(response.pictures, 4);
      this.paginator = response.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
