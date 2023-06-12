import {Component} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {CatalogueService} from '../../../catalogue-service';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIPicture, PictureService} from '@services/picture';
import {CommentsType} from '@grpc/spec.pb';
import {APIItem} from '@services/item';

@Component({
  selector: 'app-catalogue-vehicles-pictures-picture',
  templateUrl: './picture.component.html',
})
export class CatalogueVehiclesPicturesPictureComponent {
  private readonly changed$ = new BehaviorSubject<boolean>(false);

  private readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(identity);
    })
  );

  private readonly exact$ = this.route.data.pipe(
    map((params) => !!params.exact),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  private readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

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

  private readonly routerLink$ = combineLatest([this.catalogue$, this.exact$]).pipe(
    map(([{brand, path}, exact]) => [
      '/',
      brand.catname,
      ...path.map((node) => node.catname),
      ...(exact ? ['exact'] : []),
    ])
  );

  protected readonly CommentsType = CommentsType;

  protected readonly brand$: Observable<APIItem> = this.catalogue$.pipe(map(({brand}) => brand));

  protected readonly breadcrumbs$ = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path))
  );

  protected readonly picturesRouterLink$ = this.routerLink$.pipe(map((routerLink) => [...routerLink, 'pictures']));

  protected readonly galleryPictureRouterLink$ = combineLatest([this.identity$, this.routerLink$]).pipe(
    map(([identity, routerLink]) => [...routerLink, 'gallery', identity])
  );

  protected readonly picture$: Observable<APIPicture> = combineLatest([this.catalogue$, this.identity$]).pipe(
    switchMap(([{path}, identity]) => {
      const itemID = path[path.length - 1].item_id;

      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            identity,
            item_id: itemID,
            fields,
            limit: 1,
            items: {
              type_id: 1,
            },
            paginator: {
              item_id: itemID,
            },
          })
        ),
        map((response) => (response.pictures.length ? response.pictures[0] : null))
      );
    }),
    switchMap((picture) => {
      if (!picture) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(picture);
    }),
    tap((picture) => {
      this.pageEnv.set({
        pageId: 34,
        title: picture.name_text,
      });
    })
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly catalogueService: CatalogueService,
    private readonly acl: ACLService,
    private readonly pictureService: PictureService,
    private readonly router: Router
  ) {}

  protected reloadPicture() {
    this.changed$.next(true);
  }
}
