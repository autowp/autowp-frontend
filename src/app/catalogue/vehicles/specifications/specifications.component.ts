import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CatalogueService} from '../../catalogue-service';

@Component({
  selector: 'app-catalogue-vehicles-specifications',
  templateUrl: './specifications.component.html',
})
export class CatalogueVehiclesSpecificationsComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogueService = inject(CatalogueService);
  private readonly router = inject(Router);
  private readonly api = inject(APIService);

  private catalogue$ = this.catalogueService.resolveCatalogue$(this.route, 'item.has_specs,item.has_child_specs').pipe(
    switchMap((data) => {
      if (!data || !data.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1),
  );

  protected readonly brand$: Observable<APIItem> = this.catalogue$.pipe(
    map(({brand}) => brand),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 36,
        title: $localize`Specifications of` + ' ' + brand.nameHtml,
      });
    }),
    shareReplay(1),
  );

  protected readonly breadcrumbs$ = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)),
  );

  protected readonly item$ = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    shareReplay(1),
  );

  protected readonly html$ = this.item$.pipe(
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
    }),
  );
}
