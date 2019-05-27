import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, APIPathTreeItemParent, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription, combineLatest} from 'rxjs';
import {ACLService} from '../../services/acl.service';
import {APIPicture, PictureService} from '../../services/picture';
import {chunk, chunkBy} from '../../chunk';
import {ItemLinkService, APIItemLink} from '../../services/item-link';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-catalogue-index',
  templateUrl: './index.component.html'
})
@Injectable()
export class CatalogueIndexComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  public isModer = false;
  private sub: Subscription;
  private aclSub: Subscription;
  public pictures: APIPicture[][];
  public officialLinks: APIItemLink[] = [];
  public clubLinks: APIItemLink[] = [];
  public otherLinks: APIItemLink[] = [];
  public factories: APIItem[] = [];
  public sections: any;

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private pictureService: PictureService,
    private acl: ACLService,
    private itemLinkService: ItemLinkService,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {

    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    this.sub = this.activatedRoute.paramMap.pipe(
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
          fields: 'catname,description,inbox_pictures_count,full_name,logo120,descendant_twins_groups_count,name_text,name_only',
          limit: 1
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      tap(brand => {
        this.brand = brand;
        if (brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: brand.name_text,
            pageId: 10,
            args: {
              BRAND_CATNAME: brand.catname,
              BRAND_NAME: brand.name,
            }
          });
        }
      }),
      switchMap(brand =>
        combineLatest([
          this.pictureService.getPictures({
            limit: 12,
            status: 'accepted',
            order: 12,
            item_id: brand.id,
            fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
          }).pipe(
            tap(response => {
              this.pictures = chunkBy(response.pictures, 4);
            })
          ),
          this.itemLinkService.getItems({item_id: brand.id}).pipe(
            tap(response => {
              this.officialLinks = [];
              this.clubLinks = [];
              this.otherLinks = [];
              response.items.forEach(item => {
                switch (item.type_id) {
                  case 'official':
                    this.officialLinks.push(item);
                    break;
                  case 'club':
                    this.clubLinks.push(item);
                    break;
                  default:
                    this.otherLinks.push(item);
                    break;
                }
              });
            })
          ),
          this.itemService.getItems({
            limit: 4,
            factories_of_brand: brand.id,
            fields: 'name_html,exact_picture.thumb_medium'
          }).pipe(
            tap(response => {
              this.factories = response.items;
            })
          ),
          this.http.get('/api/brands/' + brand.id + '/sections').pipe(
            tap(response => {
              this.sections = response;
            })
          )
        ])

      )
    ).subscribe();
  }

  private pictureRouterLinkItem(parent: APIPathTreeItemParent): string[][] {
    const result: string[][] = [];
    switch (parent.item.item_type_id) {
      case 5: // brand
        result.push([parent.item.catname, parent.catname]);
        break;
      case 1: // vehicle
      case 2: // engine
        for (const sparent of parent.item.parents) {
          const items = this.pictureRouterLinkItem(sparent);
          for (const item of items) {
            result.push(item.concat([sparent.catname]));
          }
        }
        break;
    }
    return result;
  }

  public pictureRouterUrl(picture: APIPicture): string {
    return this.pictureRouterLink(picture).join('/');
  }

  public pictureRouterLink(picture: APIPicture): string[] {
    for (const pictureItem of picture.path) {
      if (pictureItem.type = 1) {
        switch (pictureItem.item.item_type_id) {
          case 5: // brand
            switch (pictureItem.perspective_id) {
              case 25: // mixed
                return [pictureItem.item.catname, 'mixed', picture.identity];
              case 22: // logo
                return [pictureItem.item.catname, 'logotypes', picture.identity];
              default:
                return [pictureItem.item.catname, 'other', picture.identity];
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
    this.aclSub.unsubscribe();
  }

  public chunk<T>(a: T[], count: number) {
    return chunk(a, count);
  }
}
