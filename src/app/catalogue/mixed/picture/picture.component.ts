import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem, CommentsType, ItemFields, ItemListOptions, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../comments/comments/comments.component';
import {PictureComponent} from '../../../picture/picture.component';
import {BrandPerspectivePageData} from '../../catalogue.module';

@Component({
  imports: [RouterLink, PictureComponent, CommentsComponent, AsyncPipe],
  selector: 'app-catalogue-mixed-picture',
  templateUrl: './picture.component.html',
})
export class CatalogueMixedPictureComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  private readonly changed$ = new BehaviorSubject<void>(void 0);

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
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.languageService.language,
          limit: 1,
          options: new ItemListOptions({
            catname,
          }),
        }),
      );
    }),
    map((response) => (response.items?.length ? response.items[0] : null)),
    switchMap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(brand);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly data$ = (this.route.data as Observable<BrandPerspectivePageData>).pipe(
    shareReplay({bufferSize: 1, refCount: false}),
  );

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
    }),
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
              perspective_exclude_id: (data.perspective_exclude_id || []).join(','),
              perspective_id: data.perspective_id,
            },
            perspective_exclude_id: (data.perspective_exclude_id || []).join(','),
            perspective_id: data.perspective_id,
          }),
        ),
        map((response) => (response?.pictures.length ? response.pictures[0] : null)),
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
        }),
      );
    }),
  );

  protected reloadPicture() {
    this.changed$.next();
  }
}
