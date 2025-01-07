import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem as GRPCAPIItem,
  GetPicturesRequest,
  ItemParent,
  ItemParentCacheListOptions,
  Pages,
  Picture,
  PictureFields,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {ItemHeaderComponent} from '@utils/item-header/item-header.component';
import {getItemTypeTranslation} from '@utils/translations';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

import {chunkBy} from '../../../chunk';
import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../../thumbnail/thumbnail2/thumbnail2.component';
import {Breadcrumbs, CatalogueService, convertChildsCounts} from '../../catalogue-service';
import {CatalogueItemMenuComponent} from '../../item-menu/item-menu.component';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [
    RouterLink,
    ItemHeaderComponent,
    CatalogueItemMenuComponent,
    Thumbnail2Component,
    PaginatorComponent,
    AsyncPipe,
  ],
  selector: 'app-catalogue-vehicles-pictures',
  templateUrl: './pictures.component.html',
})
export class CatalogueVehiclesPicturesComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogueService = inject(CatalogueService);
  private readonly acl = inject(ACLService);
  private readonly router = inject(Router);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  private readonly toastService = inject(ToastsService);

  protected readonly canAcceptPicture$ = this.acl.isAllowed$(Resource.PICTURE, Privilege.ACCEPT);
  protected readonly canAddItem$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly catalogue$: Observable<{brand: GRPCAPIItem; path: ItemParent[]; type: string}> =
    this.catalogueService.resolveCatalogue$(this.route).pipe(
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

  protected readonly item$: Observable<GRPCAPIItem> = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    filter((item) => !!item),
    tap((item: GRPCAPIItem) => {
      this.pageEnv.set({
        pageId: 34,
        title: $localize`All pictures of ${item.nameText}`,
      });
    }),
  );

  protected readonly pictures$: Observable<{paginator: Pages | undefined; pictures: Picture[][]}> = combineLatest([
    this.exact$,
    this.item$,
    this.page$,
  ]).pipe(
    switchMap(([exact, item, page]) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({
              itemId: exact ? item.id : undefined,
              itemParentCacheAncestor: exact ? undefined : new ItemParentCacheListOptions({parentId: item.id}),
            }),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
          }),
          fields: new PictureFields({
            thumbMedium: true,
            nameText: true,
            nameHtml: true,
            votes: true,
            views: true,
            commentsCount: true,
            moderVote: true,
          }),
          limit: 20,
          page: page,
          language: this.#languageService.language,
          order: GetPicturesRequest.Order.PERSPECTIVES,
          paginator: true,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => ({
      paginator: response.paginator,
      pictures: chunkBy(response.items || [], 4),
    })),
  );

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }

  protected readonly convertChildsCounts = convertChildsCounts;
}
