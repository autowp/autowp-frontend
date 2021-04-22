import { OnInit, OnDestroy, Component } from '@angular/core';
import {Subscription, of, EMPTY, Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { APIItem, ItemService } from '../../../services/item';
import {
  APIPicture,
  PictureService
} from '../../../services/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  map,
  debounceTime
} from 'rxjs/operators';
import {BrandPerspectivePageData} from '../../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed-picture',
  templateUrl: './picture.component.html'
})
export class CatalogueMixedPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public brand: APIItem;
  public picture: APIPicture;
  private changed$ = new BehaviorSubject<boolean>(false);
  public data: BrandPerspectivePageData;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.getBrand(),
      this.route.data as Observable<BrandPerspectivePageData>
    ]).pipe(
      switchMap(([brand, data]) => {
        this.brand = brand;
        this.data = data;

        return this.getPicture(brand.id, this.data.perspective_id, this.data.perspective_exclude_id).pipe(
          map(picture => ({picture, data}))
        );
      }),
      switchMap(data => {
        if (! data.picture) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: data.picture.name_text,
          pageId: data.data.picture_page.id
        });

        this.picture = data.picture;

        return of(data);
      }),
    ).subscribe();
  }

  private getBrand(): Observable<APIItem> {
    return this.route.paramMap.pipe(
      map(params => params.get('brand')),
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

  private getPicture(brandID: number, perspectiveID?: number, excludePerspective?: string): Observable<APIPicture> {
    return this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged(),
      switchMap(identity => {
        if (!identity) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }
        return of(identity);
      }),
      switchMap(
        identity => {
          const fields =
            'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
            'items.item.design,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
            'items.item.name_html,categories.name_html,copyrights,' +
            'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

          return this.changed$.pipe(
            switchMap(() => this.pictureService.getPictures({
              identity,
              exact_item_id: brandID,
              perspective_id: perspectiveID,
              perspective_exclude_id: excludePerspective,
              fields,
              limit: 1,
              items: {
                type_id: 1
              },
              paginator: {
                exact_item_id: brandID,
                perspective_id: perspectiveID,
                perspective_exclude_id: excludePerspective
              }
            })),
            map(response => response && response.pictures.length ? response.pictures[0] : null)
          );
        }
      ),
      switchMap(picture => {
        if (!picture) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }
        return of(picture);
      })
    );
  }

  reloadPicture() {
    this.changed$.next(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
