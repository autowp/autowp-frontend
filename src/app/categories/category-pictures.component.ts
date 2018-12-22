import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap, switchMapTo } from 'rxjs/operators';
import { ACLService } from '../services/acl.service';
import { APIPaginator } from '../services/api.service';
import { PictureService, APIPicture } from '../services/picture';
import { chunkBy } from '../chunk';

@Component({
  selector: 'app-categories-category-pictures',
  templateUrl: './category-pictures.component.html'
})
@Injectable()
export class CategoriesCategoryPicturesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public pictures: APIPicture[][] = [];
  public isModer = false;
  public canAddCar = false;
  public paginator: APIPaginator;

  constructor(
    private itemService: ItemService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService
  ) {}

  ngOnInit(): void {

    this.acl.inheritsRole('moder').subscribe(isModer => this.isModer = isModer);
    this.acl.isAllowed('car', 'add').subscribe(canAddCar => this.canAddCar = canAddCar);

    this.sub = this.route.paramMap.pipe(
      switchMap(params => {
        return this.itemService
          .getItems({
            fields: 'name_html,name_only,catname',
            limit: 1,
            type_id: 3, // category
            catname: params.get('category')
          });
      }),
      map(response => response.items.length > 0 ? response.items[0] : null),
      tap(category => {
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/162/name',
          title: category.name_text,
          pageId: 162,
          args: {
            CATEGORY_SHORT_NAME: category.name_only,
            CATEGORY_NAME: category.name_only,
            CATEGORY_CATNAME: category.catname
          }
        });
      }),
      switchMapTo(this.route.queryParamMap,
        (category, query) => ({category, query})
      ),
      switchMap(data => {
        return this.pictureService
          .getPictures({
            fields: [
              'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'
            ].join(','),
            limit: 20,
            page: parseInt(data.query.get('page'), 10),
            item_id: data.category.id,
            order: 3
          });
      }, (data, response) => ({
        category: data.category,
        pictures: response.pictures,
        paginator: response.paginator
      }))
    ).subscribe(data => {
      this.category = data.category;
      this.pictures = chunkBy(data.pictures, 4);
      this.paginator = data.paginator;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
