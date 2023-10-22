import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIPaginator} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {Observable, combineLatest} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../../chunk';
import {CategoriesService} from '../../service';

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
    distinctUntilChanged(),
  );

  protected readonly data$: Observable<{
    paginator: APIPaginator;
    pictures: PictureRoute[][];
  }> = combineLatest([this.categoriesService.categoryPipe$(this.route.parent.parent), this.page$]).pipe(
    switchMap(([{category, current, pathCatnames}, page]) =>
      this.pictureService
        .getPictures$({
          fields: ['owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'].join(','),
          item_id: current.id,
          limit: 20,
          order: 16,
          page,
          status: 'accepted',
        })
        .pipe(
          map(({paginator, pictures}) => {
            const pics: PictureRoute[] = pictures.map((pic) => ({
              picture: pic,
              route: ['/category', category.catname, ...pathCatnames, 'pictures', pic.identity],
            }));

            return {
              paginator,
              pictures: chunkBy(pics, 4),
            };
          }),
        ),
    ),
    tap(() => {
      this.pageEnv.set({pageId: 22});
    }),
  );

  constructor(
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly categoriesService: CategoriesService,
  ) {}
}
