import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../toasts/toasts.service';
import {GetPicturesRequest, PictureFields, PictureItemOptions, PicturesOptions, PictureStatus} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
})
export class TopViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly data$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((page) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
          options: new PicturesOptions({
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
            pictureItem: new PictureItemOptions({
              perspectiveId: 18,
            }),
          }),
          fields: new PictureFields({
            thumbMedium: true,
            nameText: true,
            nameHtml: true,
            votes: true,
            views: true,
            commentsCount: true,
            moderVote: true,
          }),
          limit: 18,
          page,
          language: this.#languageService.language,
          order: GetPicturesRequest.Order.ACCEPT_DATETIME_DESC,
          paginator: true,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 201}), 0);
  }
}
