import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem, GetSpecificationsRequest, ItemFields} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CatalogueService} from '../../catalogue-service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-catalogue-vehicles-specifications',
  templateUrl: './specifications.component.html',
})
export class CatalogueVehiclesSpecificationsComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogueService = inject(CatalogueService);
  private readonly router = inject(Router);
  private readonly attrsClient = inject(AttrsClient);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly languageService = inject(LanguageService);

  private catalogue$ = this.catalogueService
    .resolveCatalogue$(
      this.route,
      new ItemFields({
        hasChildSpecs: true,
        hasSpecs: true,
      }),
    )
    .pipe(
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
      if (item?.hasChildSpecs) {
        return this.attrsClient.getChildSpecifications(
          new GetSpecificationsRequest({itemId: item.id, language: this.languageService.language}),
        );
      }

      if (item?.hasSpecs) {
        return this.attrsClient.getSpecifications(
          new GetSpecificationsRequest({itemId: item.id, language: this.languageService.language}),
        );
      }

      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    // eslint-disable-next-line sonarjs/no-angular-bypass-sanitization
    map((response) => this.sanitizer.bypassSecurityTrustHtml(response.html)),
  );
}
