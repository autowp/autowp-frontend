import {Component} from '@angular/core';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {combineLatest, EMPTY, of} from 'rxjs';
import {CatalogueService} from '../../catalogue-service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {APIGalleryItem} from '../../../gallery/definitions';

@Component({
  selector: 'app-catalogue-vehicles-gallery',
  templateUrl: './gallery.component.html'
})
export class CatalogueVehiclesGalleryComponent {
  public identity$ = this.route.paramMap.pipe(
    map(route => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(identity => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return;
      }
      return of(identity);
    })
  );

  private exact$ = this.route.data.pipe(
    map(params => !!params.exact),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  private isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  private catalogue$ = this.isModer$.pipe(
    switchMap(isModer => this.catalogueService.resolveCatalogue(this.route, isModer, '')),
    switchMap(data => {
      if (!data || ! data.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  private routerLink$ = combineLatest([
    this.catalogue$,
    this.exact$
  ]).pipe(
    map(([{path, brand}, exact]) =>
      ['/', brand.catname, ...path.map(node => node.catname), ...exact ? ['exact'] : []])
  );

  public galleryRouterLink$ = this.routerLink$.pipe(
    map(routerLink => [...routerLink, 'gallery'])
  );

  public picturesRouterLink$ = this.routerLink$.pipe(
    map(routerLink => [...routerLink, 'pictures'])
  );

  public filter$ = combineLatest([this.exact$, this.catalogue$]).pipe(
    map(([exact, {path}]) => {
      const itemID = path[path.length - 1].item.id;
      return {
        itemID: exact ? null : itemID,
        exactItemID: exact ? itemID : null
      }
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private router: Router
  ) {
  }

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: 34
      });
    }, 0);
  }
}
