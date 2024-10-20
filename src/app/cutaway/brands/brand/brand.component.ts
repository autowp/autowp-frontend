import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIItem, ItemFields, ItemListOptions, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, ThumbnailComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-cutaway',
  standalone: true,
  templateUrl: './brand.component.html',
})
export class CutawayBrandsBrandComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => '' + params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemsClient.list(
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
      );
    }),
    switchMap((response) => (response.items && response.items.length > 0 ? of(response.items[0]) : EMPTY)),
    shareReplay(1),
  );

  protected readonly query$ = combineLatest([this.brand$, this.route.queryParamMap]).pipe(
    switchMap(([brand, params]) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        item_id: +brand.id,
        limit: 12,
        order: 15,
        page: parseInt(params.get('page') || '', 10),
        perspective_id: 9,
        status: 'accepted',
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
