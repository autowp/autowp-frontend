import {Component} from '@angular/core';
import {EMPTY, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, map, switchMap, shareReplay, tap} from 'rxjs/operators';
import {ItemService} from '@services/item';

@Component({
  selector: 'app-catalogue-mosts',
  templateUrl: './mosts.component.html',
})
export class CatalogueMostsComponent {
  protected readonly ratingCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('rating_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );
  protected readonly typeCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('type_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );
  protected readonly yearsCatname$ = this.route.paramMap.pipe(
    map((params) => params.get('years_catname')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly brand$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService
        .getItems$({
          catname,
          fields: 'catname,name_text,name_html',
          limit: 1,
        })
        .pipe(
          switchMap((response) => {
            if (response.items.length <= 0) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true,
              });
              return EMPTY;
            }
            return of(response.items[0]);
          })
        );
    }),
    tap((brand) => {
      this.pageEnv.set({
        pageId: 208,
        title: $localize`${brand.name_text} Engines`,
      });
    }),
    shareReplay(1)
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly itemService: ItemService,
    private readonly pageEnv: PageEnvService
  ) {}
}
