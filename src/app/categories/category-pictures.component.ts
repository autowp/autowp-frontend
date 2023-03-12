import {Component, OnInit, OnDestroy} from '@angular/core';
import {ItemService, APIItem} from '@services/item';
import {Subscription} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap, map} from 'rxjs/operators';
import {APIPaginator} from '@services/api.service';
import {PictureService, APIPicture} from '@services/picture';
import {chunkBy} from '../chunk';
import {PathItem} from './definitions';
import {CatagoriesService} from './service';

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-categories-category-pictures',
  templateUrl: './category-pictures.component.html',
})
export class CategoriesCategoryPicturesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public current: APIItem;
  public pictures: PictureRoute[][] = [];
  public paginator: APIPaginator;
  public path: PathItem[];

  constructor(
    private itemService: ItemService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    this.sub = this.categoriesService
      .categoryPipe$(this.route)
      .pipe(
        tap((data) => {
          this.current = data.current;
          this.category = data.category;
          this.path = data.pathItems;
          this.pageEnv.set({pageId: 22});
        }),
        switchMap((data) =>
          this.route.queryParamMap.pipe(
            map((query) => ({
              current: data.current,
              category: data.category,
              pathCatnames: data.pathCatnames,
              page: parseInt(query.get('page'), 10),
            }))
          )
        ),
        switchMap((data) =>
          this.pictureService
            .getPictures$({
              fields: ['owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'].join(','),
              limit: 20,
              page: data.page,
              item_id: data.current.id,
              status: 'accepted',
              order: 16,
            })
            .pipe(
              map((response) => ({
                category: data.category,
                pathCatnames: data.pathCatnames,
                pictures: response.pictures,
                paginator: response.paginator,
              }))
            )
        )
      )
      .subscribe((data) => {
        const pictures: PictureRoute[] = data.pictures.map((pic) => ({
          picture: pic,
          route: [
            '/category',
            data.category.catname,
            data.pathCatnames.length ? data.pathCatnames.join('/') : '',
            'pictures',
            pic.identity,
          ],
        }));

        this.pictures = chunkBy(pictures, 4);
        this.paginator = data.paginator;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService
        .getItems$({
          fields: 'name_html',
          parent_id: item.parent_id,
          no_parent: item.parent_id ? null : true,
          limit: 50,
          type_id: 3,
        })
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items;
        });
    }
  }
}
