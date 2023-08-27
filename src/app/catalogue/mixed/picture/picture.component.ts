import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, CommentsType, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {BrandPerspectivePageData} from '../../catalogue.module';

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
      return this.itemsClient.list(
        new ListItemsRequest({
          catname,
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.languageService.language,
          limit: 1,
        })
      );
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
            exact_item_id: +brand.id,
            fields,
            identity,
            items: {
              type_id: 1,
            },
            limit: 1,
            paginator: {
              exact_item_id: +brand.id,
              perspective_exclude_id: data.perspective_exclude_id,
              perspective_id: data.perspective_id,
            },
            perspective_exclude_id: data.perspective_exclude_id,
            perspective_id: data.perspective_id,
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
            pageId: data.picture_page.id,
            title: picture.name_text,
          });
        })
      );
    })
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService,
    private readonly router: Router,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService
  ) {}

  protected reloadPicture() {
    this.changed$.next(true);
  }
}
