import {AsyncPipe} from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIImage,
  APIItem,
  ItemFields,
  ItemListOptions,
  ItemRequest,
  ItemType,
  Picture,
  PictureFields,
  PictureItemListOptions,
  PictureItemsRequest,
  PictureItemType,
  PictureListOptions,
  PicturesRequest,
  SetPictureCropRequest,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {NgbModal, NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import Keycloak from 'keycloak-js';
import {combineLatest, concat, EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';

import {ThumbnailComponent} from '../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../toasts/toasts.service';
import {UploadCropComponent} from '../crop/crop.component';

interface APIPictureUpload {
  cropTitle: string;
  picture: Picture;
}

interface UploadProgress {
  failed: boolean;
  filename: string;
  invalidParams: InvalidParams;
  percentage: number;
  success: boolean;
}

const cropTitle = (image: APIImage | undefined): string => {
  if (!(image?.cropWidth && image?.cropHeight)) {
    return '';
  }
  const cropSize = `${image.cropWidth}×${image.cropHeight}+${image.cropLeft}+${image.cropTop}`;
  return $localize`cropped to ${cropSize}`;
};

@Component({
  imports: [
    MarkdownComponent,
    FormsModule,
    RouterLink,
    NgbProgressbar,
    AsyncPipe,
    InvalidParamsPipe,
    ThumbnailComponent,
  ],
  selector: 'app-upload-index',
  templateUrl: './index.component.html',
})
export class UploadIndexComponent implements OnInit {
  readonly #http = inject(HttpClient);
  readonly #route = inject(ActivatedRoute);
  protected readonly auth = inject(AuthService);
  readonly #pageEnv = inject(PageEnvService);
  readonly #modalService = inject(NgbModal);
  readonly #toastService = inject(ToastsService);
  readonly #keycloak = inject(Keycloak);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #itemsClient = inject(ItemsClient);

  protected files: File[] | undefined;
  protected note: string = '';
  protected progress: UploadProgress[] = [];
  protected pictures: APIPictureUpload[] = [];
  protected formHidden = false;
  protected readonly user$ = this.auth.getUser$();

  @ViewChild('input') public input: ElementRef | null = null;

  protected readonly perspectiveID$ = this.#route.queryParamMap.pipe(
    map((params) => parseInt(params.get('perspective_id') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly replace$ = this.#route.queryParamMap.pipe(
    map((params) => parseInt(params.get('replace') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  readonly #replacePicture$: Observable<null | Picture> = this.replace$.pipe(
    switchMap((replace) => {
      return replace
        ? this.#picturesClient
            .getPicture(
              new PicturesRequest({
                fields: new PictureFields({nameHtml: true}),
                language: this.#languageService.language,
                options: new PictureListOptions({id: '' + replace}),
              }),
            )
            .pipe(
              catchError((response: unknown) => {
                this.#toastService.handleError(response);
                return EMPTY;
              }),
            )
        : of(null);
    }),
  );

  protected readonly itemID$: Observable<string> = this.#route.queryParamMap.pipe(
    map((params) => params.get('item_id') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  readonly #item$: Observable<APIItem | null> = this.itemID$.pipe(
    switchMap((id) => {
      if (!id) {
        return of(null);
      }
      return this.#itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameHtml: true}),
          id,
          language: this.#languageService.language,
        }),
      );
    }),
  );

  protected readonly selection$ = combineLatest([this.#replacePicture$, this.#item$]).pipe(
    map(([replace, item]) => ({
      name: replace?.nameHtml ?? item?.nameHtml ?? '',
      selected: !!(replace || item),
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 29}), 0);
  }

  protected doLogin() {
    this.#keycloak.login({
      locale: this.#languageService.language,
      redirectUri: window.location.href,
    });
  }

  protected onChange(event: Event) {
    this.files = [].slice.call((event.target as HTMLInputElement).files);
  }

  protected submit() {
    this.progress = [];

    this.formHidden = true;

    const xhrs: Observable<Picture>[] = [];

    for (const file of this.files ? this.files : []) {
      xhrs.push(this.uploadFile$(file));
    }

    concat(...xhrs).subscribe({
      complete: () => {
        if (this.input) {
          this.input.nativeElement.value = '';
        }
        this.formHidden = false;
        this.files = undefined;
      },
    });

    return false;
  }

  private uploadFile$(file: File): Observable<Picture> {
    const progress = {
      failed: false,
      filename: file.name,
      invalidParams: {},
      percentage: 0,
      success: false,
    };

    this.progress.push(progress);

    return combineLatest([
      this.itemID$.pipe(take(1)),
      this.replace$.pipe(take(1)),
      this.perspectiveID$.pipe(take(1)),
    ]).pipe(
      map(([itemID, replace, perspectiveID]) => {
        const formData: FormData = new FormData();
        formData.append('file', file);
        if (this.note) {
          formData.append('comment', this.note);
        }

        if (itemID) {
          formData.append('item_id', itemID + '');
        }
        if (replace) {
          formData.append('replace_picture_id', replace + '');
        }
        if (perspectiveID) {
          formData.append('perspective_id', perspectiveID + '');
        }

        return formData;
      }),
      switchMap((formData) =>
        this.#http.request<{id: string}>('POST', '/api/picture', {
          body: formData,
          observe: 'events',
          reportProgress: true,
        }),
      ),
      catchError((response: unknown) => {
        if (response instanceof HttpErrorResponse) {
          progress.percentage = 100;
          progress.failed = true;

          progress.invalidParams = response.error.invalid_params;
        }

        return EMPTY;
      }),
      switchMap((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          if (event.total) {
            progress.percentage = Math.round(50 + 25 * (event.loaded / event.total));
          }
          return EMPTY;
        }

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            progress.percentage = Math.round(50 * (event.loaded / event.total));
          }
          return EMPTY;
        }

        if (event.type === HttpEventType.Response) {
          progress.percentage = 75;
          progress.success = true;

          if (!event.body) {
            return throwError(() => 'no response body');
          }

          const pictureID = event.body.id;

          return this.#picturesClient
            .getPicture(
              new PicturesRequest({
                fields: new PictureFields({
                  commentsCount: true,
                  image: true,
                  imageGalleryFull: true,
                  moderVote: true,
                  nameHtml: true,
                  nameText: true,
                  pictureItem: new PictureItemsRequest({
                    options: new PictureItemListOptions({
                      item: new ItemListOptions({
                        typeIds: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_BRAND, ItemType.ITEM_TYPE_PERSON],
                      }),
                      typeId: PictureItemType.PICTURE_ITEM_CONTENT,
                    }),
                  }),
                  thumbMedium: true,
                  views: true,
                  votes: true,
                }),
                language: this.#languageService.language,
                options: new PictureListOptions({id: pictureID}),
              }),
            )
            .pipe(
              tap((picture) => {
                progress.percentage = 100;
                this.pictures.push({
                  cropTitle: cropTitle(picture.image),
                  picture,
                });
              }),
              catchError((response: unknown) => {
                if (response instanceof HttpErrorResponse) {
                  this.#toastService.response(response);
                }
                return EMPTY;
              }),
            );
        }

        return EMPTY;
      }),
    );
  }

  protected crop(picture: APIPictureUpload) {
    const modalRef = this.#modalService.open(UploadCropComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.picture = picture.picture;
    modalRef.componentInstance.changed
      .pipe(
        switchMap(() =>
          this.#picturesClient.setPictureCrop(
            new SetPictureCropRequest({
              cropHeight: picture.picture.image?.cropHeight ? Math.round(picture.picture.image.cropHeight) : undefined,
              cropLeft: picture.picture.image?.cropLeft ? Math.round(picture.picture.image.cropLeft) : undefined,
              cropTop: picture.picture.image?.cropTop ? Math.round(picture.picture.image.cropTop) : undefined,
              cropWidth: picture.picture.image?.cropWidth ? Math.round(picture.picture.image.cropWidth) : undefined,
              pictureId: picture.picture.id,
            }),
          ),
        ),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
        switchMap(() =>
          this.#picturesClient.getPicture(
            new PicturesRequest({
              fields: new PictureFields({
                image: true,
                thumbMedium: true,
              }),
              language: this.#languageService.language,
              options: new PictureListOptions({id: picture.picture.id}),
            }),
          ),
        ),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
        tap((response: Picture) => {
          picture.picture.image = response.image;
          picture.cropTitle = cropTitle(response.image);
          picture.picture.thumbMedium = response.thumbMedium;
        }),
      )
      .subscribe();

    return false;
  }
}
