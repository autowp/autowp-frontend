import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIGetItemLinksRequest, APIItemLink, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {getCatalogueSectionsTranslation} from '@utils/translations';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunk, chunkBy} from '../../chunk';
import {CatalogueService} from '../catalogue-service';

interface APIBrandSectionGroup {
  count: number;
  name: string;
  routerLink: string[];
}

interface APIBrandSection {
  groups: APIBrandSectionGroup[];
  name: string;
  routerLink: string[];
}

interface PictureRoute {
  picture: APIPicture;
  route: string[];
}

@Component({
  selector: 'app-catalogue-index',
  templateUrl: './index.component.html',
})
export class CatalogueIndexComponent {
  protected readonly ItemType = ItemType;

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE).pipe(shareReplay(1));

  protected readonly brand$ = combineLatest([
    this.isModer$,
    this.route.paramMap.pipe(
      map((params) => params.get('brand')),
      distinctUntilChanged(),
      debounceTime(10),
    ),
  ]).pipe(
    switchMap(([isModer, catname]) => {
      if (!catname) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      let fields = 'description,full_name,logo120,descendant_twins_groups_count,name_text,name_only,mosts_active';
      if (isModer) {
        fields += ',inbox_pictures_count';
      }

      return this.itemService
        .getItems$({
          catname,
          fields,
          limit: 1,
        })
        .pipe(
          switchMap((response) => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true,
              });
              return EMPTY;
            }
            return of(response.items[0]);
          }),
        );
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 10,
        title: brand.name_text,
      });
    }),
    shareReplay(1),
  );

  protected readonly pictures$ = this.brand$.pipe(
    switchMap((brand) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text,path',
        item_id: brand.id,
        limit: 12,
        order: 12,
        status: 'accepted',
      }),
    ),
    map((response) => {
      const pictures: PictureRoute[] = response.pictures.map((pic) => ({
        picture: pic,
        route: this.catalogue.picturePathToRoute(pic),
      }));

      return chunkBy(pictures, 4);
    }),
  );

  protected readonly links$ = this.brand$.pipe(
    switchMap((brand) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + brand.id}))),
    map((response) => {
      const official: APIItemLink[] = [];
      const club: APIItemLink[] = [];
      const other: APIItemLink[] = [];
      response.items.forEach((item) => {
        switch (item.type) {
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
      return {club, official, other};
    }),
  );

  protected readonly factories$ = this.brand$.pipe(
    switchMap((brand) =>
      this.itemService.getItems$({
        factories_of_brand: brand.id,
        fields: 'name_html,exact_picture.thumb_medium',
        limit: 4,
        type_id: ItemType.ITEM_TYPE_FACTORY,
      }),
    ),
    map((response) => response.items),
  );

  protected readonly sections$: Observable<
    {halfChunks: APIBrandSectionGroup[][][]; name: string; routerLink: string[]}[]
  > = this.brand$.pipe(
    switchMap((brand) => this.api.request<APIBrandSection[]>('GET', 'brands/' + brand.id + '/sections')),
    map((response) =>
      response.map((section) => ({
        halfChunks: chunk(section.groups, 2).map((halfChunk) => chunk(halfChunk, 2)),
        name: getCatalogueSectionsTranslation(section.name),
        routerLink: section.routerLink,
      })),
    ),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly acl: ACLService,
    private readonly api: APIService,
    private readonly router: Router,
    private readonly catalogue: CatalogueService,
    private readonly itemsClient: ItemsClient,
  ) {}
}
