import {Component} from '@angular/core';
import {of, EMPTY, Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {APIPicture, PictureService} from '@services/picture';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, distinctUntilChanged, map, debounceTime, shareReplay, tap} from 'rxjs/operators';
import {BrandPerspectivePageData} from '../../catalogue.module';
import {CommentsType} from '@grpc/spec.pb';

@Component({
  selector: 'app-catalogue-mixed-picture',
  templateUrl: './picture.component.html',
})
export class CatalogueMixedPictureComponent {
  private readonly changed$ = new BehaviorSubject<boolean>(false);

  protected readonly CommentsType = CommentsType;

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
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

  protected readonly data$ = (this.route.data as Observable<BrandPerspectivePageData>).pipe(shareReplay(1));

  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(identity);
    })
  );

  protected readonly picture$: Observable<APIPicture> = combineLatest([this.brand$, this.data$, this.identity$]).pipe(
    switchMap(([brand, data, identity]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            identity,
            exact_item_id: brand.id,
            perspective_id: data.perspective_id,
            perspective_exclude_id: data.perspective_exclude_id,
            fields,
            limit: 1,
            items: {
              type_id: 1,
            },
            paginator: {
              exact_item_id: brand.id,
              perspective_id: data.perspective_id,
              perspective_exclude_id: data.perspective_exclude_id,
            },
          })
        ),
        map((response) => (response && response.pictures.length ? response.pictures[0] : null)),
        switchMap((picture) => {
          if (!picture) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true,
            });
            return EMPTY;
          }
          return of(picture);
        }),
        tap((picture) => {
          this.pageEnv.set({
            title: picture.name_text,
            pageId: data.picture_page.id,
          });
        })
      );
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService,
    private readonly router: Router
  ) {}

  protected reloadPicture() {
    this.changed$.next(true);
  }
}
