import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem} from '../../../../services/item';
import {PageEnvService} from '../../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Subscription} from 'rxjs';
import {Breadcrumbs, CatalogueService} from '../../../catalogue-service';
import {ACLService} from '../../../../services/acl.service';
import {APIItemParent} from '../../../../services/item-parent';
import {APIGetPicturesOptions, APIPicture, PictureService} from '../../../../services/picture';

@Component({
  selector: 'app-catalogue-vehicles-pictures-picture',
  templateUrl: './picture.component.html'
})
@Injectable()
export class CatalogueVehiclesPicturesPictureComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public isModer: boolean;
  public path: APIItemParent[] = [];
  public breadcrumbs: Breadcrumbs[] = [];
  public routerLink: string[];
  public picturesRouterLink: string[];
  private galleryRouterLink: string[];
  public galleryPictureRouterLink: string[];
  public item: APIItem;
  public picture: APIPicture;
  private changed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private pictureService: PictureService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sub = this.acl.inheritsRole('moder').pipe(
      tap(isModer => (this.isModer = isModer)),
      switchMap(isModer => combineLatest([
        this.catalogueService.resolveCatalogue(this.route, isModer, ''),
        this.getExact()
      ])),
      map(data => {
        if (! data[0].brand || !data[0].path || data[0].path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.brand = data[0].brand;
        this.path = data[0].path;
        this.breadcrumbs = CatalogueService.pathToBreadcrumbs(data[0].brand, data[0].path);
        const routerLink = ['/', this.brand.catname];

        for (const node of this.path) {
          routerLink.push(node.catname);
        }

        this.routerLink = routerLink;
        this.picturesRouterLink = [...routerLink];
        this.galleryRouterLink = [...routerLink];
        if (data[1]) {
          this.picturesRouterLink.push('exact');
          this.galleryRouterLink.push('exact');
        }
        this.picturesRouterLink.push('pictures');
        this.galleryRouterLink.push('gallery');

        return data;
      }),
      switchMap(data => this.getIdentity().pipe(
        map(identity => {

          this.galleryPictureRouterLink = [...this.galleryRouterLink, identity];

          return {
            brand: data[0].brand,
            path: data[0].path,
            type: data[0].type,
            exact: data[1],
            identity: identity
          };
        })
      )),
      switchMap(data => {
        const last = data.path[data.path.length - 1];
        this.item = last.item;

        return this.getPicture(data.identity, last.item_id);
      })
    ).subscribe(picture => {
      if (!picture) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      this.picture = picture;
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        pageId: 34,
        nameTranslated: picture.name_text
      });
    });
  }

  private getPicture(identity: string, itemID: number) {
    if (!identity) {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }

    const fields =
      'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,' +
      'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
      'items.item.name_html,categories.name_html,copyrights,' +
      'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

    const options: APIGetPicturesOptions = {
      identity: identity,
      item_id: itemID,
      fields: fields,
      limit: 1,
      items: {
        type_id: 1
      },
      paginator: {
        item_id: itemID
      }
    };

    return this.changed$.pipe(
      switchMap(value => this.pictureService.getPictures(options)),
      map(response => response.pictures.length ? response.pictures[0] : null)
    );
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

  reloadPicture() {
    this.changed$.next(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
