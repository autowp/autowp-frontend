import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, ItemFields, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  selector: 'app-cutaway',
  templateUrl: './brand.component.html',
})
export class CutawayBrandsBrandComponent implements OnInit {
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
          catname,
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.languageService.language,
          limit: 1,
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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
