import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {EMPTY, Subscription, of, combineLatest} from 'rxjs';
import {ACLService} from '../../services/acl.service';
import {APIPicture, PictureService} from '../../services/picture';
import {chunk, chunkBy} from '../../chunk';
import {ItemLinkService, APIItemLink} from '../../services/item-link';
import {CatalogueService} from '../catalogue-service';
import { APIService } from '../../services/api.service';

interface APIBrandSectionGroup {
  name: string;
  routerLink: string[];
  count: number;
}

interface APIBrandSection {
  name: string;
  routerLink: string[];
  groups: APIBrandSectionGroup[];
}

interface ChunkedSesction {
  name: string;
  halfChuks: APIBrandSectionGroup[][][];
  routerLink: string[];
}

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

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
  public pictures: PictureRoute[][];
  public officialLinks: APIItemLink[] = [];
  public clubLinks: APIItemLink[] = [];
  public otherLinks: APIItemLink[] = [];
  public factories: APIItem[] = [];
  public sections: ChunkedSesction[];

  constructor(
    private pageEnv: PageEnvService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private acl: ACLService,
    private itemLinkService: ItemLinkService,
    private api: APIService,
    private router: Router,
    private catalogue: CatalogueService
  ) {
  }

  ngOnInit(): void {
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    this.sub = this.getBrand().pipe(
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
      switchMap(brand => combineLatest([
        this.loadPictures(brand.id),
        this.loadLinks(brand.id),
        this.loadFactories(brand.id),
        this.api.request<APIBrandSection[]>('GET', 'brands/' + brand.id + '/sections').pipe(
          tap(response => {
            const sections: ChunkedSesction[] = [];
            for (const section of response) {
              const halfChunks: APIBrandSectionGroup[][][] = [];
              for (const halfChunk of chunk(section.groups, 2)) {
                halfChunks.push(chunk(halfChunk, 2));
              }
              sections.push({
                name: section.name,
                halfChuks: halfChunks,
                routerLink: section.routerLink
              });
            }

            this.sections = sections;
          })
        )
      ]))
    ).subscribe();
  }

  private getIsModer() {
    return this.acl.inheritsRole('moder');
  }

  private getCatname() {
    return this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  private getBrand() {
    return combineLatest([this.getIsModer(), this.getCatname()]).pipe(
      switchMap(data => {
        this.isModer = data[0];

        if (!data[1]) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        let fields = 'description,full_name,logo120,descendant_twins_groups_count,name_text,name_only,mosts_active';
        if (data[0]) {
          fields += ',inbox_pictures_count';
        }

        return this.itemService.getItems({
          catname: data[1],
          fields: fields,
          limit: 1
        }).pipe(
          switchMap(response => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true
              });
              return EMPTY;
            }
            return of(response.items[0]);
          })
        );
      })
    );
  }

  private loadPictures(brandID: number) {
    return this.pictureService.getPictures({
      limit: 12,
      status: 'accepted',
      order: 12,
      item_id: brandID,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
    }).pipe(
      tap(response => {
        const pictures: PictureRoute[] = [];
        for (const pic of response.pictures) {
          pictures.push({
            picture: pic,
            route: this.catalogue.picturePathToRoute(pic)
          });
        }

        this.pictures = chunkBy(pictures, 4);
      })
    );
  }

  private loadLinks(brandID: number) {
    return this.itemLinkService.getItems({item_id: brandID}).pipe(
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
    );
  }

  private loadFactories(brandID: number) {
    return this.itemService.getItems({
      limit: 4,
      factories_of_brand: brandID,
      fields: 'name_html,exact_picture.thumb_medium',
      type_id: 6
    }).pipe(
      tap(response => {
        this.factories = response.items;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.aclSub.unsubscribe();
  }
}
