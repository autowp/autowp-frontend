import {Component} from '@angular/core';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {CatalogueService} from '../../catalogue-service';
import {ACLService, Privilege, Resource} from '../../../services/acl.service';
import {APIService} from '../../../services/api.service';

@Component({
  selector: 'app-catalogue-vehicles-specifications',
  templateUrl: './specifications.component.html',
})
export class CatalogueVehiclesSpecificationsComponent {
  private isModer$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE);

  private catalogue$ = this.isModer$.pipe(
    switchMap((isModer) =>
      this.catalogueService.resolveCatalogue(this.route, isModer, 'item.has_specs,item.has_child_specs')
    ),
    switchMap((data) => {
      if (!data || !data.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  public brand$ = this.catalogue$.pipe(
    map(({brand}) => brand),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 36,
        title: $localize`Specifications of` + ' ' + brand.name_text,
      });
    }),
    shareReplay(1)
  );

  public breadcrumbs$ = this.catalogue$.pipe(map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)));

  public item$ = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    shareReplay(1)
  );

  public html$ = this.item$.pipe(
    switchMap((item) => {
      if (item.has_child_specs) {
        return this.api.request('GET', 'item/' + item.id + '/child-specifications', {
          responseType: 'text',
        });
      }

      if (item.has_specs) {
        return this.api.request('GET', 'item/' + item.id + '/specifications', {
          responseType: 'text',
        });
      }

      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private catalogueService: CatalogueService,
    private acl: ACLService,
    private router: Router,
    private api: APIService
  ) {}
}
