import {Component} from '@angular/core';
import {ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import {APIPicture, PictureService} from '../../services/picture';
import {chunkBy} from '../../chunk';
import {CatalogueService} from '../catalogue-service';

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-catalogue-recent',
  templateUrl: './recent.component.html',
})
export class CatalogueRecentComponent {
  private page$ = this.route.queryParamMap.pipe(
    map((queryParams) => parseInt(queryParams.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public brand$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService
        .getItems$({
          catname,
          fields: 'name_text,name_html',
          limit: 1,
        })
        .pipe(
          map((response) => (response && response.items.length ? response.items[0] : null)),
          tap((brand) => {
            if (brand) {
              this.pageEnv.set({
                pageId: 15,
                title: $localize`Last pictures of ${brand.name_text}`,
              });
            }
          })
        );
    }),
    shareReplay(1)
  );

  public data$ = combineLatest([this.brand$, this.page$]).pipe(
    switchMap(([brand, page]) =>
      this.pictureService.getPictures$({
        limit: 12,
        status: 'accepted',
        order: 15,
        item_id: brand.id,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
        page,
      })
    ),
    map((response) => {
      const pictures: PictureRoute[] = response.pictures.map((picture) => ({
        picture,
        route: this.catalogue.picturePathToRoute(picture),
      }));
      return {
        pictures: chunkBy(pictures, 4),
        paginator: response.paginator,
      };
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private catalogue: CatalogueService
  ) {}
}
