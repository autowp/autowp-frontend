import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { ActivatedRoute } from '@angular/router';
import {switchMap, tap, map} from 'rxjs/operators';
import { ACLService } from '../services/acl.service';
import { APIPaginator } from '../services/api.service';
import { PictureService, APIPicture } from '../services/picture';
import { chunkBy } from '../chunk';
import { PathItem } from './definitions';
import { CatagoriesService } from './service';

@Component({
  selector: 'app-categories-category-pictures',
  templateUrl: './category-pictures.component.html'
})
@Injectable()
export class CategoriesCategoryPicturesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public current: APIItem;
  public pictures: APIPicture[][] = [];
  public isModer = false;
  public canAddCar = false;
  public paginator: APIPaginator;
  public path: PathItem[];
  private pathCatnames: string[] = [];

  constructor(
    private itemService: ItemService,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private acl: ACLService,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    this.acl
      .inheritsRole('moder')
      .subscribe((isModer) => (this.isModer = isModer));
    this.acl
      .isAllowed('car', 'add')
      .subscribe((canAddCar) => (this.canAddCar = canAddCar));

    this.sub = this.categoriesService.categoryPipe(this.route)
      .pipe(
        tap((data) => {
          this.current = data.current;
          this.category = data.category;
          this.path = data.pathItems;
          this.pathCatnames = data.pathCatnames;
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            name: 'page/186/title',
            pageId: 22
          });
        }),
        switchMap(data => this.route.queryParamMap.pipe(
          map(query => ({
            current: data.current,
            page: parseInt(query.get('page'), 10)
          }))
        )),
        switchMap(
          data => this.pictureService.getPictures({
            fields: [
              'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'
            ].join(','),
            limit: 20,
            page: data.page,
            item_id: data.current.id,
            status: 'accepted',
            order: 16
          })
        )
      )
      .subscribe((data) => {
        this.pictures = chunkBy(data.pictures, 4);
        this.paginator = data.paginator;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public pictureRouterLink(picture: APIPicture): string[] {
    if (!this.category) {
      return null;
    }

    return [
      '/category',
      this.category.catname,
      this.pathCatnames.length ? this.pathCatnames.join('/') : '',
      'pictures',
      picture.identity
    ];
  }

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService
        .getItems({
          fields: 'name_html',
          parent_id: item.parent_id,
          no_parent: item.parent_id ? null : true,
          limit: 50,
          type_id: 3
        })
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items;
        });
    }
  }
}
