import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CatalogueService} from '../../catalogue-service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-catalogue-vehicles-specifications',
  standalone: true,
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
      if (!data?.brand || !data.path || data.path.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly brand$: Observable<APIItem> = this.catalogue$.pipe(
    map(({brand}) => brand),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 36,
        title: $localize`Specifications of` + ' ' + brand.nameHtml,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly breadcrumbs$ = this.catalogue$.pipe(
    map(({brand, path}) => CatalogueService.pathToBreadcrumbs(brand, path)),
  );

  protected readonly item$ = this.catalogue$.pipe(
    map(({path}) => path[path.length - 1].item),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly html$ = this.item$.pipe(
    switchMap((item) => {
      if (item.has_child_specs) {
        return this.api.request$('GET', 'item/' + item.id + '/child-specifications', {
          responseType: 'text',
        });
      }

      if (item.has_specs) {
        return this.api.request$('GET', 'item/' + item.id + '/specifications', {
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
