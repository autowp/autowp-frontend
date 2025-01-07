import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../toasts/toasts.service';
import {GetPicturesRequest, GetPicturesResponse, PictureFields, PicturesOptions, PictureStatus} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';

@Component({
  imports: [Thumbnail2Component, PaginatorComponent, AsyncPipe],
  selector: 'app-account-inbox-pictures',
  templateUrl: './inbox-pictures.component.html',
})
export class AccountInboxPicturesComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  protected readonly data$: Observable<GetPicturesResponse> = combineLatest([
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') ?? '', 10)),
      distinctUntilChanged(),
      debounceTime(10),
    ),
    this.auth.getUser$(),
  ]).pipe(
    switchMap(([page, user]) =>
      user
        ? this.#picturesClient.getPictures(
            new GetPicturesRequest({
              options: new PicturesOptions({
                ownerId: user.id,
                status: PictureStatus.PICTURE_STATUS_INBOX,
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
              limit: 15,
              page: page,
              language: this.#languageService.language,
              order: GetPicturesRequest.Order.ADD_DATE_DESC,
              paginator: true,
            }),
          )
        : EMPTY,
    ),
    catchError((err: unknown) => {
      this.#toastService.handleError(err);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 94}), 0);
  }
}
