import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import {Subscription, of, EMPTY, Observable, BehaviorSubject} from 'rxjs';
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
  tap, debounceTime
} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-logotypes-picture',
  templateUrl: './picture.component.html'
})
@Injectable()
export class CatalogueLogotypesPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public brand: APIItem;
  public picture: APIPicture;
  private changed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.getBrand().pipe(
      tap(brand => {
        this.brand = brand;
      }),
      switchMap(brand => this.getPicture(brand.id)),
      tap(picture => {
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: picture.name_text,
          pageId: 192
        });

        this.picture = picture;
      })
    )
    .subscribe();
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
          catname: catname,
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

  private getPicture(brandID: number): Observable<APIPicture> {
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
            'owner,name_html,name_text,image,preview_large,paginator,subscribed,' +
            'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
            'items.item.name_html,categories.name_html,copyrights,' +
            'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

          return this.changed$.pipe(
            switchMap(value => this.pictureService.getPictures({
              identity: identity,
              exact_item_id: brandID,
              perspective_id: 22,
              fields: fields,
              limit: 1,
              items: {
                type_id: 1
              },
              paginator: {
                exact_item_id: brandID,
                perspective_id: 22
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
