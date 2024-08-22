import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, ItemFields, ItemRequest, SetPictureCropRequest} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {KeycloakService} from 'keycloak-angular';
import {EMPTY, Observable, combineLatest, concat, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, take, tap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {UploadCropComponent} from '../crop/crop.component';

interface UploadProgress {
  failed: boolean;
  filename: string;
  invalidParams: InvalidParams;
  percentage: number;
  success: boolean;
}

interface APIPictureUpload extends APIPicture {
  cropTitle: string;
}

const cropTitle = (crop: {height: null | number; left: null | number; top: null | number; width: null | number}) => {
  const cropSize = `${crop.width}×${crop.height}+${crop.left}+${crop.top}`;
  return $localize`cropped to ${cropSize}`;
};

@Component({
  selector: 'app-upload-index',
  templateUrl: './index.component.html',
})
export class UploadIndexComponent implements OnInit {
  protected files: File[] | undefined;
  protected note: string = '';
  protected progress: UploadProgress[] = [];
  protected pictures: APIPictureUpload[] = [];
  protected formHidden = false;
  protected readonly user$ = this.auth.getUser$();

  @ViewChild('input') public input: ElementRef | null = null;

  protected readonly perspectiveID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('perspective_id') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly replace$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('replace') || '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly replacePicture$: Observable<APIPicture | null> = this.replace$.pipe(
    switchMap((replace) => {
      return replace ? this.pictureService.getPicture$(replace, {fields: 'name_html'}) : of(null);
    }),
  );

  protected readonly itemID$: Observable<string> = this.route.queryParamMap.pipe(
    map((params) => params.get('item_id') || ''),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly item$: Observable<APIItem | null> = this.itemID$.pipe(
    switchMap((id) => {
      if (!id) {
        return of(null);
      }
      return this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({nameHtml: true}),
          id,
          language: this.languageService.language,
        }),
      );
    }),
  );

  protected readonly selection$ = combineLatest([this.replacePicture$, this.item$]).pipe(
    map(([replace, item]) => ({
      name: replace ? replace.name_html : item ? item.nameHtml : '',
      selected: !!(replace || item),
    })),
  );

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    protected readonly auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastsService,
    private readonly keycloak: KeycloakService,
    private readonly languageService: LanguageService,
    private readonly itemsClient: ItemsClient,
    private readonly picturesClient: PicturesClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 29}), 0);
  }

  protected doLogin() {
    this.keycloak.login({
      locale: this.languageService.language,
      redirectUri: window.location.href,
    });
  }

  protected onChange(event: Event) {
    this.files = [].slice.call((event.target as HTMLInputElement).files);
  }

  protected submit() {
    this.progress = [];

    this.formHidden = true;

    const xhrs: Observable<APIPicture>[] = [];

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

  private uploadFile$(file: File): Observable<APIPicture> {
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
        this.api.request('POST', 'picture', {
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

          const location = event.headers.get('Location') || '';

          return this.pictureService
            .getPictureByLocation$(location, {
              fields:
                'crop,image_gallery_full,thumb_medium,votes,views,comments_count,perspective_item,name_html,name_text',
            })
            .pipe(
              tap((picture) => {
                progress.percentage = 100;
                this.pictures.push({
                  ...picture,
                  cropTitle: picture.crop ? cropTitle(picture.crop) : '',
                });
              }),
              catchError((response: unknown) => {
                if (response instanceof HttpErrorResponse) {
                  this.toastService.response(response);
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
    const modalRef = this.modalService.open(UploadCropComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.picture = picture;
    modalRef.componentInstance.changed
      .pipe(
        switchMap(() =>
          this.picturesClient.setPictureCrop(
            new SetPictureCropRequest({
              cropHeight: picture.crop.height ? Math.round(picture.crop.height) : undefined,
              cropLeft: picture.crop.left ? Math.round(picture.crop.left) : undefined,
              cropTop: picture.crop.top ? Math.round(picture.crop.top) : undefined,
              cropWidth: picture.crop.width ? Math.round(picture.crop.width) : undefined,
              pictureId: '' + picture.id,
            }),
          ),
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        switchMap(() =>
          this.pictureService.getPicture$(picture.id, {
            fields: 'crop,thumb_medium',
          }),
        ),
        catchError((response: unknown) => {
          this.toastService.handleError(response);
          return EMPTY;
        }),
        tap((response: APIPicture) => {
          picture.crop = response.crop;
          picture.cropTitle = response.crop ? cropTitle(response.crop) : '';
          picture.thumb_medium = response.thumb_medium;
        }),
      )
      .subscribe();

    return false;
  }
}
