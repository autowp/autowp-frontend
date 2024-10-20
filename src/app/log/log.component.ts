import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, APIUser, ItemFields, ItemRequest, LogEventsRequest, Pages} from '@grpc/spec.pb';
import {ItemsClient, LogClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {UserService} from '@services/user';
import {EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly logClient = inject(LogClient);
  private readonly userService = inject(UserService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly pictureService = inject(PictureService);
  private readonly languageService = inject(LanguageService);

  protected readonly response$: Observable<{
    items: {
      createdAt: Date | undefined;
      description: string;
      items: Observable<APIItem | null>[];
      pictures: Observable<APIPicture>[];
      user$: Observable<APIUser | null>;
    }[];
    paginator: Pages | undefined;
  }> = this.route.queryParamMap.pipe(
    map((params) => ({
      article_id: params.get('article_id'),
      item_id: params.get('item_id'),
      page: params.get('page'),
      picture_id: params.get('picture_id'),
      user_id: params.get('user_id'),
    })),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    debounceTime(30),
    switchMap((params) =>
      this.logClient.getEvents(
        new LogEventsRequest({
          articleId: params.article_id || undefined,
          itemId: params.item_id || undefined,
          page: +(params.page || 0),
          pictureId: params.picture_id || undefined,
          userId: params.user_id || undefined,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      items: (response.items || []).map((event) => ({
        createdAt: event.createdAt?.toDate(),
        description: event.description,
        items: event.items.map((item) =>
          this.itemsClient.item(
            new ItemRequest({
              fields: new ItemFields({nameHtml: true}),
              id: item,
              language: this.languageService.language,
            }),
          ),
        ),
        pictures: event.pictures.map((item) => this.pictureService.getPicture$(+item, {fields: 'name_html'})),
        user$: this.userService.getUser$(event.userId),
      })),
      paginator: response.paginator,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 75}), 0);
  }
}
