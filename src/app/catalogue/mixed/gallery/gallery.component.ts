import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Observable, of, Subscription} from 'rxjs';
import {APIPaginator} from '../../../services/api.service';
import {APIGalleryItem} from '../../../gallery/definitions';
import {BrandPerspectivePageData} from '../../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed-gallery',
  templateUrl: './gallery.component.html'
})
@Injectable()
export class CatalogueMixedGalleryComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public paginator: APIPaginator;
  public picturesRouterLink: string[];
  public galleryRouterLink: string[];
  public current: string;
  public data: BrandPerspectivePageData;

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {
  }

  private getBrand(): Observable<APIItem> {
    return this.route.paramMap.pipe(
      map(params => {
        return params.get('brand');
      }),
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(catname => {
        if (!catname) {
          return EMPTY;
        }
        return this.itemService.getItems({
          catname,
          fields: 'name_text,name_html',
          limit: 1
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      switchMap(brand => {
        if (!brand) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }
        return of(brand);
      })
    );
  }

  ngOnInit(): void {

    this.sub = this.sub = combineLatest([
      this.getBrand(),
      this.route.data as Observable<BrandPerspectivePageData>
    ]).pipe(
      switchMap(data => this.getIdentity().pipe(
        map(identity => ({brand: data[0], data: data[1], identity}))
      )),
      switchMap(data => {
        if (!data.identity) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        return of(data);
      }),
      tap(data => {
        this.brand = data.brand;
        this.data = data.data;
        this.current = data.identity;
      })
    ).subscribe();
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
        pageId: this.data.picture_page.id
      });
    }, 0);
  }
}
