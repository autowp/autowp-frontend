import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, combineLatest, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../gallery/definitions';
import {CatalogueService} from '../../catalogue-service';

@Component({
  selector: 'app-catalogue-vehicles-gallery',
  templateUrl: './gallery.component.html',
})
export class CatalogueVehiclesGalleryComponent {
  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return;
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

  protected readonly galleryRouterLink$ = this.routerLink$.pipe(map((routerLink) => [...routerLink, 'gallery']));

  protected readonly picturesRouterLink$ = this.routerLink$.pipe(map((routerLink) => [...routerLink, 'pictures']));

  protected readonly filter$ = combineLatest([this.exact$, this.catalogue$]).pipe(
    map(([exact, {path}]) => {
      const itemID = path[path.length - 1].item.id;
      return {
        exactItemID: exact ? itemID : null,
        itemID: exact ? null : itemID,
      };
    })
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly catalogueService: CatalogueService,
    private readonly acl: ACLService,
    private readonly router: Router
  ) {}

  protected pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        pageId: 34,
        title: item.name,
      });
    }, 0);
  }
}
