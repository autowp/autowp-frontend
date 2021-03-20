import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, of, Subscription} from 'rxjs';
import {APIPaginator} from '../../../services/api.service';
import {CatalogueListItem} from '../../../utils/list-item/list-item.component';
import {CatalogueService} from '../../catalogue-service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {APIGalleryItem} from '../../../gallery/definitions';

@Component({
  selector: 'app-catalogue-vehicles-gallery',
  templateUrl: './gallery.component.html'
})
@Injectable()
export class CatalogueVehiclesGalleryComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public items: CatalogueListItem[];
  public paginator: APIPaginator;
  public picturesRouterLink: string[];
  public galleryRouterLink: string[];
  public item: APIItem;
  public current: string;
  public exact: boolean;

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.sub = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE).pipe(
      switchMap(isModer => combineLatest([
        this.catalogueService.resolveCatalogue(this.route, isModer, ''),
        this.getExact()
      ])),
      switchMap(([data, exact]) => {
        if (!data || ! data.brand || !data.path || data.path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.brand = data.brand;
        if (data.brand) {
          this.pageEnv.set({
            layout: {
              needRight: false
            },
            pageId: 34,
            nameTranslated: data.brand.name_text
          });
        }
        // this.path = data[0].path;
        const routerLink = ['/', this.brand.catname];

        for (const node of data.path) {
          routerLink.push(node.catname);
        }

        this.exact = exact;
        // this.routerLink = routerLink;
        this.picturesRouterLink = [...routerLink];
        this.galleryRouterLink = [...routerLink];
        if (this.exact) {
          this.picturesRouterLink.push('exact');
          this.galleryRouterLink.push('exact');
        }
        this.picturesRouterLink.push('pictures');
        this.galleryRouterLink.push('gallery');

        return of({
          brand: data.brand,
          path: data.path,
          type: data.type,
          exact
        });
      }),
      switchMap(data => this.getIdentity().pipe(
        map(identity => {
          return {
            brand: data.brand,
            path: data.path,
            type: data.type,
            exact: data.exact,
            identity
          };
        })
      )),
      switchMap(data => {
        if (!data.identity) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return;
        }

        return of(data);
      }),
      tap(data => {
        const last = data.path[data.path.length - 1];
        this.item = last.item;
        this.current = data.identity;
      })
    ).subscribe();
  }

  private getExact() {
    return this.route.data.pipe(
      map(params => {
        return !!params.exact;
      }),
      distinctUntilChanged(),
      debounceTime(10)
    );
  }

  private getIdentity() {
    return this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false,
          isGalleryPage: true
        },
        nameTranslated: item.name,
        pageId: 34
      });
    }, 0);
  }
}
