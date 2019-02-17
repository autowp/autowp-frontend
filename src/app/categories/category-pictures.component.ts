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

interface PathItem {
  routerLink: string[];
  item: APIItem;
  loaded: boolean;
  childs: APIItem[];
  parent_id: number;
}

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
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));
    this.acl
      .isAllowed('car', 'add')
      .subscribe(canAddCar => (this.canAddCar = canAddCar));

    this.sub = this.route.paramMap
      .pipe(
        switchMap(params => {
          const path = params.get('path');
          return this.itemService.getPath({
            catname: params.get('category'),
            path: path ? path : ''
          });
        }),
        map(response => {
          let category: APIItem = null;
          for (const item of response.path) {
            if (item.item.item_type_id !== 3) {
              break;
            }
            category = item.item;
          }
          return {
            current: response.path[response.path.length - 1].item,
            category: category,
            path: response.path
          };
        }),
        tap(data => {
          let catname = '';
          const pathCatnames: string[] = [];
          const pathItems: PathItem[] = [];
          for (const item of data.path) {
            if (item.item.item_type_id === 3) {
              catname = item.item.catname;
            }
            if (item.item.item_type_id !== 3) {
              pathCatnames.push(item.catname);
            }
            pathItems.push({
              routerLink: ['/category', catname].concat(pathCatnames),
              item: item.item,
              loaded: false,
              childs: [],
              parent_id: item.parent_id
            });
          }

          this.current = data.current;
          this.category = data.category;
          this.path = pathItems;
          this.pathCatnames = pathCatnames;
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            name: 'page/186/title',
            pageId: 22
          });
        }),
        switchMapTo(this.route.queryParamMap, (data, query) => ({
          current: data.current,
          page: parseInt(query.get('page'), 10)
        })),
        switchMap(
          data => {
            return this.pictureService.getPictures({
              fields: [
                'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text'
              ].join(','),
              limit: 20,
              page: data.page,
              item_id: data.current.id,
              status: 'accepted',
              order: 3
            });
          },
          (data, response) => ({
            pictures: response.pictures,
            paginator: response.paginator
          })
        )
      )
      .subscribe(data => {
        this.pictures = chunkBy(data.pictures, 4);
        this.paginator = data.paginator;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public pictureUrl(picture: APIPicture): string {
    if (!this.category) {
      return null;
    }

    return (
      '/category/' +
      this.category.catname +
      (this.pathCatnames.length ? '/' + this.pathCatnames.join('/') : '') +
      '/pictures/' +
      picture.identity
    );
  }

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {

      this.itemService.getItems({
        fields: 'catname,name_html',
        parent_id: item.parent_id,
        no_parent: item.parent_id ? null : true,
        limit: 50,
        type_id: 3
      }).subscribe(response => {
        item.loaded = true;
        item.childs = response.items;
      });
    }
  }
}
