import {Component} from '@angular/core';
import {ItemService} from '../../services/item';
import {PageEnvService} from '../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of, combineLatest} from 'rxjs';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIPicture, PictureService} from '../../services/picture';
import {chunk, chunkBy} from '../../chunk';
import {ItemLinkService} from '../../services/item-link';
import {CatalogueService} from '../catalogue-service';
import { APIService } from '../../services/api.service';
import { getCatalogueSectionsTranslation } from '../../utils/translations';

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

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-catalogue-index',
  templateUrl: './index.component.html'
})
export class CatalogueIndexComponent {
  public isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE).pipe(shareReplay(1));

  public brand$ = combineLatest([
    this.isModer$,
    this.route.paramMap.pipe(
      map(params => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10)
    )
  ]).pipe(
    switchMap(([isModer, catname]) => {
      if (!catname) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }

      let fields = 'description,full_name,logo120,descendant_twins_groups_count,name_text,name_only,mosts_active';
      if (isModer) {
        fields += ',inbox_pictures_count';
      }

      return this.itemService.getItems({
        catname,
        fields,
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
    }),
    tap(brand => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        nameTranslated: brand.name_text,
        pageId: 10
      });
    }),
    shareReplay(1)
  );

  public pictures$ = this.brand$.pipe(
    switchMap(brand => this.pictureService.getPictures({
      limit: 12,
      status: 'accepted',
      order: 12,
      item_id: brand.id,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
    })),
    map(response => {
      const pictures: PictureRoute[] = response.pictures.map(pic => ({
        picture: pic,
        route: this.catalogue.picturePathToRoute(pic)
      }));

      return chunkBy(pictures, 4);
    })
  );

  public links$ = this.brand$.pipe(
    switchMap(brand => this.itemLinkService.getItems({item_id: brand.id})),
    map(response => {
      const official = [];
      const club = [];
      const other = [];
      response.items.forEach(item => {
        switch (item.type_id) {
          case 'official':
            official.push(item);
            break;
          case 'club':
            club.push(item);
            break;
          default:
            other.push(item);
            break;
        }
      });
      return {official, club, other};
    })
  );

  public factories$ = this.brand$.pipe(
    switchMap(brand => this.itemService.getItems({
      limit: 4,
      factories_of_brand: brand.id,
      fields: 'name_html,exact_picture.thumb_medium',
      type_id: 6
    })),
    map(response => response.items)
  );

  public sections$ = this.brand$.pipe(
    switchMap(brand => this.api.request<APIBrandSection[]>('GET', 'brands/' + brand.id + '/sections')),
    map(response => response.map(section => ({
      name: getCatalogueSectionsTranslation(section.name),
      halfChuks: chunk(section.groups, 2).map(halfChunk => chunk(halfChunk, 2)),
      routerLink: section.routerLink
    })))
  );

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
}
