import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {APIItem, ItemService} from '@services/item';
import {of, Observable, concat, combineLatest, EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PictureService, APIPicture} from '@services/picture';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, catchError, tap, distinctUntilChanged, debounceTime, map, take} from 'rxjs/operators';
import {UploadCropComponent} from '../crop/crop.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {KeycloakService} from 'keycloak-angular';
import {LanguageService} from '@services/language';

interface UploadProgress {
  filename: string;
  percentage: number;
  success: boolean;
  failed: boolean;
  invalidParams: any;
}

interface APIPictureUpload extends APIPicture {
  cropTitle: string;
}

const cropTitle = (crop: {left: number | null; top: number | null; width: number | null; height: number | null}) => {
  const cropSize = `${crop.width}×${crop.height}+${crop.left}+${crop.top}`;
  return $localize`cropped to ${cropSize}`;
};

@Component({
  selector: 'app-upload-index',
  templateUrl: './index.component.html',
})
export class UploadIndexComponent implements OnInit {
  protected files: any[];
  protected note: string;
  protected progress: UploadProgress[] = [];
  protected pictures: APIPictureUpload[] = [];
  protected formHidden = false;
  protected readonly user$ = this.auth.getUser$();

  @ViewChild('input') input;

  protected readonly perspectiveID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('perspective_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  protected readonly replace$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('replace'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly replacePicture$ = this.replace$.pipe(
    switchMap((replace) => {
      return replace ? this.pictureService.getPicture$(replace, {fields: 'name_html'}) : of(null as APIPicture);
    })
  );

  protected readonly itemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private readonly item$ = this.itemID$.pipe(
    switchMap((itemID) => {
      return itemID ? this.itemService.getItem$(itemID, {fields: 'name_html'}) : of(null as APIItem);
    })
  );

  protected readonly selection$ = combineLatest([this.replacePicture$, this.item$]).pipe(
    map(([replace, item]) => ({
      selected: !!(replace || item),
      name: replace ? replace.name_html : item ? item.name_html : '',
    }))
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    protected auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastsService,
    private readonly keycloak: KeycloakService,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 29}), 0);
  }

  protected doLogin() {
    this.keycloak.login({
      redirectUri: window.location.href,
      locale: this.languageService.language,
    });
  }

  protected onChange(event: any) {
    this.files = [].slice.call(event.target.files);
  }

  protected submit() {
    this.progress = [];

    this.formHidden = true;

    const xhrs: Observable<APIPicture>[] = [];

    for (const file of this.files) {
      xhrs.push(this.uploadFile$(file));
    }

    concat(...xhrs).subscribe({
      complete: () => {
        this.input.nativeElement.value = '';
        this.formHidden = false;
        this.files = undefined;
      },
    });

    return false;
  }

  private uploadFile$(file: any): Observable<APIPicture> {
    const progress = {
      filename: file.fileName || file.name,
      percentage: 0,
      success: false,
      failed: false,
      invalidParams: {},
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
        })
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
          progress.percentage = Math.round(50 + 25 * (event.loaded / event.total));
          return EMPTY;
        }

        if (event.type === HttpEventType.UploadProgress) {
          progress.percentage = Math.round(50 * (event.loaded / event.total));
          return EMPTY;
        }

        if (event.type === HttpEventType.Response) {
          progress.percentage = 75;
          progress.success = true;

          const location = event.headers.get('Location');

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
              })
            );
        }

        return EMPTY;
      })
    );
  }

  protected crop(picture: APIPictureUpload) {
    const modalRef = this.modalService.open(UploadCropComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.picture = picture;
    modalRef.componentInstance.changed
      .pipe(
        switchMap(() =>
          this.api.request<void>('PUT', 'picture/' + picture.id, {
            body: {
              crop: picture.crop,
            },
          })
        ),
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.toastService.response(response);
          }
          return EMPTY;
        }),
        switchMap(() =>
          this.pictureService.getPicture$(picture.id, {
            fields: 'crop,thumb_medium',
          })
        ),
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.toastService.response(response);
          }
          return EMPTY;
        }),
        tap((response: APIPicture) => {
          picture.crop = response.crop;
          picture.cropTitle = cropTitle(response.crop);
          picture.thumb_medium = response.thumb_medium;
        })
      )
      .subscribe();

    return false;
  }
}
