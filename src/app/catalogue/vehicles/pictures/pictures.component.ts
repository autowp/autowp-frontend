import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem as GRPCAPIItem} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem} from '@services/item';
import {APIItemParent} from '@services/item-parent';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {getItemTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../../chunk';
import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../thumbnail/thumbnail/thumbnail.component';
import {Breadcrumbs, CatalogueService} from '../../catalogue-service';
import {CatalogueItemMenuComponent} from '../../item-menu/item-menu.component';

@Component({
  imports: [
    RouterLink,
    ItemHeaderComponent,
    CatalogueItemMenuComponent,
    ThumbnailComponent,
    PaginatorComponent,
    AsyncPipe,
  ],
  selector: 'app-catalogue-vehicles-pictures',
  standalone: true,
  templateUrl: './pictures.component.html',
})
export class CatalogueVehiclesPicturesComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly pictureService = inject(PictureService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogueService = inject(CatalogueService);
  private readonly acl = inject(ACLService);
  private readonly router = inject(Router);

  protected readonly canAcceptPicture$ = this.acl.isAllowed$(Resource.PICTURE, Privilege.ACCEPT);
  protected readonly canAddItem$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly catalogue$: Observable<{brand: GRPCAPIItem; path: APIItemParent[]; type: string}> =
    this.catalogueService.resolveCatalogue$(this.route, '').pipe(
      switchMap((data) => {
        if (!data?.brand || !data.path || data.path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
          return EMPTY;
        }
        return of(data);
      }),
      shareReplay({bufferSize: 1, refCount: false}),
    );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly exact$ = this.route.data.pipe(
    map((params) => !!params['exact']),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brand$: Observable<GRPCAPIItem> = this.catalogue$.pipe(map(({brand}) => brand));

  protected readonly breadcrumbs$: Observable<Breadcrumbs[]> = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)),
  );

  protected readonly routerLink$: Observable<string[]> = this.catalogue$.pipe(
    map(({brand, path}) => ['/', brand.catname, ...path.map((node) => node.catname)]),
  );

  protected readonly picturesRouterLink$: Observable<string[]> = combineLatest([this.routerLink$, this.exact$]).pipe(
    map(([routerLink, exact]) => [...routerLink, ...(exact ? ['exact'] : []), 'pictures']),
  );

  protected readonly item$: Observable<APIItem> = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    tap((item: APIItem) => {
      this.pageEnv.set({
        pageId: 34,
        title: $localize`All pictures of ${item.name_text}`,
      });
    }),
  );

  protected readonly pictures$ = combineLatest([this.exact$, this.item$, this.page$]).pipe(
    switchMap(([exact, item, page]) =>
      this.pictureService.getPictures$({
        exact_item_id: exact ? item.id : undefined,
        fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
        item_id: exact ? undefined : item.id,
        limit: 20,
        order: 16,
        page,
        status: 'accepted',
      }),
    ),
    map((response) => ({
      paginator: response.paginator,
      pictures: chunkBy(response.pictures, 4),
    })),
  );

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
