import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap, map, distinctUntilChanged} from 'rxjs/operators';
import {PictureService, APIPicture} from '@services/picture';
import {chunkBy} from '../../../chunk';
import {CategoriesService} from '../../service';
import {combineLatest, Observable} from 'rxjs';
import {APIPaginator} from '@services/api.service';

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-categories-category-pictures',
  templateUrl: './pictures.component.html',
})
export class CategoriesCategoryPicturesComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged()
  );

  protected readonly data$: Observable<{
    pictures: PictureRoute[][];
    paginator: APIPaginator;
  }> = combineLatest([this.categoriesService.categoryPipe$(this.route.parent.parent), this.page$]).pipe(
    switchMap(([{current, category, pathCatnames}, page]) =>
      this.pictureService
        .getPictures$({
          fields: ['owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'].join(','),
          limit: 20,
          page,
          item_id: current.id,
          status: 'accepted',
          order: 16,
        })
        .pipe(
          map(({pictures, paginator}) => {
            const pics: PictureRoute[] = pictures.map((pic) => ({
              picture: pic,
              route: ['/category', category.catname, ...pathCatnames, 'pictures', pic.identity],
            }));

            return {
              pictures: chunkBy(pics, 4),
              paginator,
            };
          })
        )
    ),
    tap(() => {
      this.pageEnv.set({pageId: 22});
    })
  );

  constructor(
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly categoriesService: CategoriesService
  ) {}
}
