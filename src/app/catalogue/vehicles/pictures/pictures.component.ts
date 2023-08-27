import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {getItemTypeTranslation} from '@utils/translations';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {chunkBy} from '../../../chunk';
import {CatalogueService} from '../../catalogue-service';

@Component({
  selector: 'app-catalogue-vehicles-pictures',
  templateUrl: './pictures.component.html',
})
export class CatalogueVehiclesPicturesComponent {
  protected readonly canAcceptPicture$ = this.acl.isAllowed$(Resource.PICTURE, Privilege.ACCEPT);
  protected readonly canAddItem$ = this.acl.isAllowed$(Resource.CAR, Privilege.ADD);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly catalogue$ = this.isModer$.pipe(
    switchMap((isModer) => this.catalogueService.resolveCatalogue$(this.route, isModer, '')),
    switchMap((data) => {
      if (!data || !data.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly exact$ = this.route.data.pipe(
    map((params) => !!params.exact),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly brand$: Observable<APIItem> = this.catalogue$.pipe(map(({brand}) => brand));

  protected readonly breadcrumbs$ = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path))
  );

  protected readonly routerLink$ = this.catalogue$.pipe(
    map(({brand, path}) => ['/', brand.catname, ...path.map((node) => node.catname)])
  );

  protected readonly picturesRouterLink$ = combineLatest([this.routerLink$, this.exact$]).pipe(
    map(([routerLink, exact]) => [...routerLink, ...(exact ? ['exact'] : []), 'pictures'])
  );

  protected readonly item$ = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    tap((item) => {
      this.pageEnv.set({
        pageId: 34,
        title: $localize`All pictures of ${item.name_text}`,
      });
    })
  );

  protected readonly pictures$ = combineLatest([this.exact$, this.item$, this.page$]).pipe(
    switchMap(([exact, item, page]) =>
      this.pictureService.getPictures$({
        exact_item_id: exact ? item.id : null,
        fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
        item_id: exact ? null : item.id,
        limit: 20,
        order: 16,
        page,
        status: 'accepted',
      })
    ),
    map((response) => ({
      paginator: response.paginator,
      pictures: chunkBy(response.pictures, 4),
    }))
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService,
    private readonly route: ActivatedRoute,
    private readonly catalogueService: CatalogueService,
    private readonly acl: ACLService,
    private readonly router: Router
  ) {}

  protected getItemTypeTranslation(id: number, type: string) {
    return getItemTypeTranslation(id, type);
  }
}
