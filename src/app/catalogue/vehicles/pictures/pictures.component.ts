import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, of} from 'rxjs';
import {PictureService} from '@services/picture';
import {chunkBy} from '../../../chunk';
import {CatalogueService} from '../../catalogue-service';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {getItemTypeTranslation} from '@utils/translations';

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

  protected readonly brand$ = this.catalogue$.pipe(map(({brand}) => brand));

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
        fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
        limit: 20,
        page,
        item_id: exact ? null : item.id,
        exact_item_id: exact ? item.id : null,
        status: 'accepted',
        order: 16,
      })
    ),
    map((response) => ({
      pictures: chunkBy(response.pictures, 4),
      paginator: response.paginator,
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
