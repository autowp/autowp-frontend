import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../toasts/toasts.service';
import {GetPicturesRequest, PictureFields, PictureItemOptions, PicturesOptions, PictureStatus} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  imports: [RouterLink, Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-cutaway',
  templateUrl: './cutaway.component.html',
})
export class CutawayComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly query$ = this.route.queryParamMap.pipe(
    switchMap((params) =>
      this.#picturesClient.getPictures(
        new GetPicturesRequest({
          options: new PicturesOptions({
            pictureItem: new PictureItemOptions({perspectiveId: 9}),
            status: PictureStatus.PICTURE_STATUS_ACCEPTED,
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
          limit: 12,
          page: parseInt(params.get('page') ?? '', 10),
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
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
