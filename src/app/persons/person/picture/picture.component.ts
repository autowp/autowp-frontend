import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CommentsType,
  Picture,
  PictureFields,
  PictureItemListOptions,
  PictureItemType,
  PictureListOptions,
  PictureModerVoteRequest,
  PicturesRequest,
} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../comments/comments/comments.component';
import {Picture2Component} from '../../../picture/picture2.component';

@Component({
  imports: [CommentsComponent, AsyncPipe, Picture2Component],
  selector: 'app-persons-person-picture',
  templateUrl: './picture.component.html',
})
export class PersonsPersonPictureComponent {
  readonly #pageEnv = inject(PageEnvService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);

  readonly #changed$ = new BehaviorSubject<void>(void 0);

  protected readonly identity$ = this.#route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    switchMap((identity) => {
      if (!identity) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(identity);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly itemID$ = this.#route.parent!.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly picture$: Observable<null | Picture> = combineLatest([
    this.itemID$,
    this.identity$,
    this.#changed$,
  ]).pipe(
    switchMap(([itemID, identity]) =>
      this.#picturesClient.getPicture(
        new PicturesRequest({
          fields: new PictureFields({
            copyrights: true,
            image: true,
            moderVoted: true,
            nameHtml: true,
            nameText: true,
            paginator: new PicturesRequest({
              options: new PictureListOptions({
                pictureItem: new PictureItemListOptions({
                  itemId: itemID,
                  typeId: PictureItemType.PICTURE_ITEM_AUTHOR,
                }),
              }),
              order: PicturesRequest.Order.ORDER_PERSPECTIVES,
            }),
            pictureModerVotes: new PictureModerVoteRequest(),
            previewLarge: true,
            replaceable: new PicturesRequest({
              fields: new PictureFields({nameHtml: true}),
            }),
            rights: true,
            subscribed: true,
            votes: true,
          }),
          language: this.#languageService.language,
          options: new PictureListOptions({
            identity,
            pictureItem: new PictureItemListOptions({
              itemId: itemID,
              typeId: PictureItemType.PICTURE_ITEM_CONTENT,
            }),
          }),
        }),
      ),
    ),
    tap((picture) => {
      this.#pageEnv.set({
        pageId: 34,
        title: picture ? picture.nameText : '',
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly CommentsType = CommentsType;

  protected reloadPicture() {
    this.#changed$.next();
  }
}
