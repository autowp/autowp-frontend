import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  imports: [ThumbnailComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-twins-group-pictures-list',
  standalone: true,
  templateUrl: './list.component.html',
})
export class TwinsGroupPicturesListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly pictureService = inject(PictureService);
  private readonly toastService = inject(ToastsService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly id$: Observable<string> = this.route.parent!.parent!.paramMap.pipe(
    map((params) => params.get('group') || ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly group$: Observable<APIItem> = this.id$.pipe(
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: group,
          language: this.languageService.language,
        }),
      );
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 28,
            title: $localize`All pictures of ${group.nameText}`,
          }),
        0,
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
  );

  protected readonly data$: Observable<APIPictureGetResponse | null> = combineLatest([this.page$, this.id$]).pipe(
    switchMap(([page, groupId]) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        item_id: +groupId,
        limit: 24,
        order: 16,
        page: page,
        status: 'accepted',
      }),
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null);
    }),
  );
}
