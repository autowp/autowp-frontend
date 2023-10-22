import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-catalogue-mosts',
  templateUrl: './mosts.component.html',
})
export class CatalogueMostsComponent {
  protected readonly ratingCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('rating_catname')),
    distinctUntilChanged(),
    debounceTime(10),
  );
  protected readonly typeCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('type_catname')),
    distinctUntilChanged(),
    debounceTime(10),
  );
  protected readonly yearsCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('years_catname')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient
        .list(
          new ListItemsRequest({
            catname,
            fields: new ItemFields({
              nameHtml: true,
              nameText: true,
            }),
            language: this.languageService.language,
            limit: 1,
          }),
        )
        .pipe(
          switchMap((response) => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true,
              });
              return EMPTY;
            }
            return of(response.items[0]);
          }),
        );
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 208,
        title: $localize`${brand.nameText} Engines`,
      });
    }),
    shareReplay(1),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pageEnv: PageEnvService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
