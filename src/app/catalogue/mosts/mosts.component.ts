import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem, ItemFields, ItemListOptions, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {MostsContentsComponent} from '../../mosts/contents/contents.component';

@Component({
  imports: [RouterLink, MostsContentsComponent, AsyncPipe],
  selector: 'app-catalogue-mosts',
  standalone: true,
  templateUrl: './mosts.component.html',
})
export class CatalogueMostsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

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
            fields: new ItemFields({
              nameHtml: true,
              nameText: true,
            }),
            language: this.languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname,
            }),
          }),
        )
        .pipe(
          switchMap((response) => {
            if (!response.items || response.items.length <= 0) {
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
}
