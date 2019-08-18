import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import {Subscription, of, EMPTY} from 'rxjs';
import { APIItem, ItemService } from '../../../services/item';
import {
  APIPicture,
  PictureService,
  APIPictureGetResponse
} from '../../../services/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  map,
  tap, debounceTime, switchMapTo
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

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const identityPipe = this.route.paramMap.pipe(
      map((route) => route.get('identity')),
      distinctUntilChanged()
    );

    this.sub = this.route.paramMap.pipe(
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
          fields: 'catname,name_text,name_html',
          limit: 1
        });
      }),
      map(response => response && response.items.length ? response.items[0] : null),
      tap(brand => {
        this.brand = brand;
      }),
      switchMapTo(identityPipe, (brand, identity) => ({
        brand: brand,
        identity: identity
      })),
      switchMap(
        (data) => {
          if (!data.brand) {
            return of(null as APIPictureGetResponse);
          }

          if (!data.identity) {
            return of(null as APIPictureGetResponse);
          }

          const fields =
            'owner,name_html,name_text,image,preview_large,add_date,dpi,point,paginator,' +
            'items.item.design,items.item.description,items.item.specs_url,items.item.has_specs,items.item.alt_names,' +
            'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
            'twins.name_html,factories.name_html,moder_votes,votes,of_links,replaceable.url,replaceable.name_html';

          return this.pictureService.getPictures({
            identity: data.identity,
            status: 'accepted',
            exact_item_id: data.brand.id,
            perspective_id: 22,
            fields: fields,
            limit: 1,
            items: {
              type_id: 1
            },
            paginator: {
              item_id: data.brand.id
            }
          });
        },
        (data, response) => ({
          brand: data.brand,
          picture:
            response && response.pictures.length ? response.pictures[0] : null
        })
      )
    )
    .subscribe((data) => {
      if (!data.picture || !data.brand) {
        this.router.navigate(['/error-404']);
        return;
      }

      this.pageEnv.set({
        layout: {
          needRight: false
        },
        nameTranslated: data.picture.name_text,
        pageId: 192
      });

      this.picture = data.picture;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
