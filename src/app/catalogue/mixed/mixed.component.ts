import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../chunk';
import {BrandPerspectivePageData} from '../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed',
  templateUrl: './mixed.component.html',
})
export class CatalogueMixedComponent {
  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
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

  private readonly page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly data$ = (this.route.data as Observable<BrandPerspectivePageData>).pipe(
    tap((data) => {
      this.pageEnv.set({
        pageId: data.page_id,
        title: data.title,
      });
    }),
    shareReplay(1)
  );

  protected readonly pictures$ = combineLatest([this.page$, this.brand$, this.data$]).pipe(
    switchMap(([page, brand, data]) =>
      this.pictureService.getPictures$({
        exact_item_id: brand.id,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        order: 3,
        page: page,
        perspective_exclude_id: data.perspective_exclude_id,
        perspective_id: data.perspective_id,
        status: 'accepted',
      })
    ),
    map((response) => ({
      paginator: response.paginator,
      pictures: chunkBy(response.pictures, 4),
    })),
    shareReplay(1)
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly router: Router
  ) {}
}
