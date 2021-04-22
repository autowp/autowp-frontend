import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIItem} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {EMPTY, of, Subscription} from 'rxjs';
import {Breadcrumbs, CatalogueService} from '../../catalogue-service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-catalogue-vehicles-specifications',
  templateUrl: './specifications.component.html'
})
export class CatalogueVehiclesSpecificationsComponent implements OnInit, OnDestroy {
  public brand: APIItem;
  private sub: Subscription;
  public item: APIItem;
  public current: string;
  public html: string;
  public breadcrumbs: Breadcrumbs[] = [];

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private router: Router,
    private api: APIService,
  ) {
  }

  ngOnInit(): void {
    this.sub = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE).pipe(
      switchMap(isModer => this.catalogueService.resolveCatalogue(this.route, isModer, 'item.has_specs,item.has_child_specs')),
      switchMap(data => {
        if (!data || ! data.brand || !data.path || data.path.length <= 0) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.brand = data.brand;
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          pageId: 36,
          nameTranslated: ($localize`Specifications of`) + ' ' + data.brand.name_text
        });

        const current = data.path[data.path.length - 1].item;

        this.item = current;
        this.breadcrumbs = CatalogueService.pathToBreadcrumbs(data.brand, data.path);

        /*const routerLink = ['/', this.brand.catname];

        for (const node of data.path) {
          routerLink.push(node.catname);
        }*/

        return of(current);
      }),
      switchMap(item => {
        if (item.has_child_specs) {
          return this.api.request(
            'GET',
            'item/' + item.id + '/child-specifications',
            {
              responseType: 'text'
            }
          );
        }

        if (item.has_specs) {
          return this.api.request(
            'GET',
            'item/' + item.id + '/specifications',
            {
              responseType: 'text'
            }
          );
        }

        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      })
    ).subscribe(html => {
      this.html = html;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
