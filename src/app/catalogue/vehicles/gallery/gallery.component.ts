import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../gallery/definitions';
import {APIGalleryFilter, GalleryComponent} from '../../../gallery/gallery.component';
import {CatalogueService} from '../../catalogue-service';

@Component({
  imports: [GalleryComponent, AsyncPipe],
  selector: 'app-catalogue-vehicles-gallery',
  templateUrl: './gallery.component.html',
})
export class CatalogueVehiclesGalleryComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogueService = inject(CatalogueService);
  private readonly router = inject(Router);

  protected readonly identity$ = this.route.paramMap.pipe(
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
    }),
  );

  private readonly exact$ = this.route.data.pipe(
    map((params) => !!params['exact']),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly catalogue$ = this.catalogueService.resolveCatalogue$(this.route).pipe(
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

  private readonly routerLink$ = combineLatest([this.catalogue$, this.exact$]).pipe(
    map(([{brand, path}, exact]) => [
      '/',
      brand.catname,
      ...path.map((node) => node.catname),
      ...(exact ? ['exact'] : []),
    ]),
  );

  protected readonly galleryRouterLink$ = this.routerLink$.pipe(map((routerLink) => [...routerLink, 'gallery']));

  protected readonly picturesRouterLink$ = this.routerLink$.pipe(map((routerLink) => [...routerLink, 'pictures']));

  protected readonly filter$: Observable<APIGalleryFilter> = combineLatest([this.exact$, this.catalogue$]).pipe(
    map(([exact, {path}]) => {
      const itemID = path[path.length - 1].item?.id;
      return {
        exactItemID: exact ? itemID : undefined,
        itemID: exact ? undefined : itemID,
      };
    }),
  );

  protected pictureSelected(item: APIGalleryItem | null) {
    if (item) {
      setTimeout(() => {
        this.pageEnv.set({
          layout: {isGalleryPage: true},
          pageId: 34,
          title: item.name,
        });
      }, 0);
    }
  }
}
