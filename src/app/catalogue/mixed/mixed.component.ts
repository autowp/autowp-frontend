import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {PictureService} from '@services/picture';
import {chunkBy} from '../../chunk';
import {BrandPerspectivePageData} from '../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed',
  templateUrl: './mixed.component.html',
})
export class CatalogueMixedComponent {
  public brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.itemService.getItems$({
        catname,
        fields: 'name_text,name_html',
        limit: 1,
      });
    }),
    map((response) => (response && response.items.length ? response.items[0] : null)),
    switchMap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(brand);
    }),
    shareReplay(1)
  );

  public page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public data$ = (this.route.data as Observable<BrandPerspectivePageData>).pipe(
    tap((data) => {
      this.pageEnv.set({
        pageId: data.page_id,
        title: data.title,
      });
    }),
    shareReplay(1)
  );

  public pictures$ = combineLatest([this.page$, this.brand$, this.data$]).pipe(
    switchMap(([page, brand, data]) =>
      this.pictureService.getPictures$({
        limit: 12,
        status: 'accepted',
        order: 3,
        exact_item_id: brand.id,
        perspective_id: data.perspective_id,
        perspective_exclude_id: data.perspective_exclude_id,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        page: page,
      })
    ),
    map((response) => ({
      pictures: chunkBy(response.pictures, 4),
      paginator: response.paginator,
    })),
    shareReplay(1)
  );

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router
  ) {}
}
