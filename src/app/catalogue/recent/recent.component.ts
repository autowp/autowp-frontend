import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {EMPTY, Observable, combineLatest} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../chunk';
import {CatalogueService} from '../catalogue-service';

interface PictureRoute {
  picture: APIPicture;
  route: null | string[];
}

@Component({
  selector: 'app-catalogue-recent',
  templateUrl: './recent.component.html',
})
export class CatalogueRecentComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brand$: Observable<APIItem | null> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient
        .list(
          new ListItemsRequest({
            catname,
            fields: new ItemFields({
              nameHtml: true,
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
          }),
        )
        .pipe(
          map((response) => (response.items && response.items.length ? response.items[0] : null)),
          tap((brand) => {
            if (brand) {
              this.pageEnv.set({
                pageId: 15,
                title: $localize`Last pictures of ${brand.nameText}`,
              });
            }
          }),
        );
    }),
    shareReplay(1),
  );

  protected readonly data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      brand
        ? this.pictureService.getPictures$({
            fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
            item_id: +brand.id,
            limit: 12,
            order: 15,
            page,
            status: 'accepted',
          })
        : EMPTY,
    ),
    map((response) => {
      const pictures: PictureRoute[] = response.pictures.map((picture) => ({
        picture,
        route: this.catalogue.picturePathToRoute(picture),
      }));
      return {
        paginator: response.paginator,
        pictures: chunkBy(pictures, 4),
      };
    }),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly catalogue: CatalogueService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
