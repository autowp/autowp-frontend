import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, APIPathTreeItemParent, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription} from 'rxjs';
import {APIPicture, PictureService} from '../../services/picture';
import {chunk, chunkBy} from '../../chunk';
import {APIPaginator} from '../../services/api.service';


@Component({
  selector: 'app-catalogue-recent',
  templateUrl: './recent.component.html'
})
@Injectable()
export class CatalogueRecentComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public pictures: APIPicture[][];
  public paginator: APIPaginator;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname: catname,
          fields: 'name_text,name_html',
          limit: 1
        }).pipe(
          map(response => response && response.items.length ? response.items[0] : null),
          tap(brand => {
            this.brand = brand;
            if (brand) {
              this.pageEnv.set({
                layout: {
                  needRight: false
                },
                pageId: 15,
                name: 'page/15/ng-name',
                args: {
                  brand: brand.name_text,
                }
              });
            }
          })
        );
      }),
      switchMap(brand =>
        this.route.queryParamMap.pipe(
          map(queryParams => ({
            brand: brand,
            queryParams: queryParams
          }))
        )
      ),
      switchMap(data =>
        this.pictureService.getPictures({
          limit: 12,
          status: 'accepted',
          order: 30,
          item_id: data.brand.id,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
          page: +data.queryParams.get('page')
        })
      )
    ).subscribe(response => {
      this.pictures = chunkBy(response.pictures, 4);
      this.paginator = response.paginator;
    });
  }

  private pictureRouterLinkItem(parent: APIPathTreeItemParent): string[][] {
    const result: string[][] = [];
    switch (parent.item.item_type_id) {
      case 5: // brand
        result.push(['/', parent.item.catname, parent.catname]);
        break;
      case 1: // vehicle
      case 2: // engine
        for (const sparent of parent.item.parents) {
          const items = this.pictureRouterLinkItem(sparent);
          for (const item of items) {
            result.push(item.concat([parent.catname]));
          }
        }
        break;
    }
    return result;
  }

  public pictureRouterLink(picture: APIPicture): string[] {
    for (const pictureItem of picture.path) {
      if (pictureItem.type === 1) {
        switch (pictureItem.item.item_type_id) {
          case 5: // brand
            switch (pictureItem.perspective_id) {
              case 25: // mixed
                return ['/', pictureItem.item.catname, 'mixed', picture.identity];
              case 22: // logo
                return ['/', pictureItem.item.catname, 'logotypes', picture.identity];
              default:
                return ['/', pictureItem.item.catname, 'other', picture.identity];
            }
          case 1: // vehicle
          case 2: // engine
            for (const parent of pictureItem.item.parents) {
              const items = this.pictureRouterLinkItem(parent);
              for (const item of items) {
                return item.concat(['pictures', picture.identity]);
              }
            }
            break;
        }
      }
    }

    return null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public chunk<T>(a: T[], count: number) {
    return chunk(a, count);
  }
}
