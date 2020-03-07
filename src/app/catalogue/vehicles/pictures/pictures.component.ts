import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, EMPTY, Subscription} from 'rxjs';
import {APIPaginator} from '../../../services/api.service';
import {APIPicture, PictureService} from '../../../services/picture';
import {chunkBy} from '../../../chunk';
import {Breadcrumbs, CatalogueService} from '../../catalogue-service';
import {ACLService} from '../../../services/acl.service';
import {APIItemParent} from '../../../services/item-parent';

@Component({
  selector: 'app-catalogue-vehicles-pictures',
  templateUrl: './pictures.component.html'
})
@Injectable()
export class CatalogueVehiclesPicturesComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public pictures: APIPicture[][] = [];
  public paginator: APIPaginator;
  public isModer: boolean;
  public path: APIItemParent[] = [];
  public breadcrumbs: Breadcrumbs[] = [];
  public item: APIItem;
  public routerLink: string[];
  public picturesRouterLink: string[];
  public canAddItem: boolean;
  public canAcceptPicture: boolean;

  constructor(
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.acl
      .isAllowed('car', 'add')
      .subscribe(canAddItem => (this.canAddItem = canAddItem));
    this.acl
      .isAllowed('picture', 'accept')
      .subscribe(canAcceptPicture => (this.canAcceptPicture = canAcceptPicture));

    this.sub = this.acl.inheritsRole('moder').pipe(
      tap(isModer => (this.isModer = isModer)),
      switchMap(isModer => combineLatest([
        this.catalogueService.resolveCatalogue(this.route, isModer, ''),
        this.getExact()
      ])),
      switchMap(data => {
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
        if (data[1]) {
          this.picturesRouterLink.push('exact');
        }
        this.picturesRouterLink.push('pictures');

        const last = data[0].path[data[0].path.length - 1];
        this.item = last.item;

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 34,
          name: 'page/34/ng-name',
          args: {
            item: this.item.name_text,
          }
        });

        return this.getPage().pipe(
          switchMap(page => this.pictureService.getPictures({
            fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
            limit: 20,
            page: page,
            item_id: data[1] ? null : last.item_id,
            exact_item_id: data[1] ? last.item_id : null,
            status: 'accepted',
            order: 16
          }))
        );
      })
    ).subscribe(data => {
      this.pictures = chunkBy(data.pictures, 4);
      this.paginator = data.paginator;
    });
  }

  private getPage() {
    return this.route.queryParamMap.pipe(
      map(params => +params.get('page')),
      distinctUntilChanged(),
      debounceTime(10)
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
