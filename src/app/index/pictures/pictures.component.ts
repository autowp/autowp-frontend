import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {catchError, map} from 'rxjs/operators';

import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {GetPicturesRequest, Picture, PictureFields, PicturesOptions, PictureStatus} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {EMPTY, Observable} from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, Thumbnail2Component, AsyncPipe],
  selector: 'app-index-pictures',
  templateUrl: './pictures.component.html',
})
export class IndexPicturesComponent {
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #toastService = inject(ToastsService);

  protected readonly items$: Observable<Picture[]> = this.#picturesClient
    .getPictures(
      new GetPicturesRequest({
        options: new PicturesOptions({
          acceptedInDays: 3,
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
        limit: 4,
        language: this.#languageService.language,
        order: GetPicturesRequest.Order.ACCEPT_DATETIME_DESC,
        paginator: false,
      }),
    )
    .pipe(
      catchError((err: unknown) => {
        this.#toastService.handleError(err);
        return EMPTY;
      }),
      map((response) => response.items || []),
    );
}
