import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {combineLatest, EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './item.component.html',
})
export class NewItemComponent {
  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('item_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly date$ = this.route.paramMap.pipe(
    map((params) => params.get('date')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
  );

  protected readonly item$ = this.itemID$.pipe(
    switchMap((itemID) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: '' + itemID,
          language: this.languageService.language,
        }),
      ),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    tap((item) => {
      this.pageEnv.set({
        pageId: 210,
        title: item.nameText,
      });
    }),
    shareReplay(1),
  );

  protected readonly pictures$ = combineLatest([this.itemID$, this.date$, this.page$]).pipe(
    switchMap(([itemID, date, page]) =>
      this.pictureService.getPictures$({
        accept_date: date ? date : undefined,
        fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
        item_id: itemID,
        limit: 24,
        page,
        status: 'accepted',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
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
}
