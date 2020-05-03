import {
  Component,
  Injectable,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
// import { CropDialog } from 'crop-dialog';
import { HttpEventType } from '@angular/common/http';
import { APIItem, ItemService } from '../services/item';
import {
  Subscription,
  of,
  Observable,
  concat,
  combineLatest, EMPTY
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PictureService, APIPicture } from '../services/picture';
import { AuthService } from '../services/auth.service';
import { PageEnvService } from '../services/page-env.service';
import {
  switchMap,
  catchError,
  tap,
  distinctUntilChanged,
  debounceTime, map
} from 'rxjs/operators';
import { APIUser } from '../services/user';
import { UploadCropComponent } from './crop/crop.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastsService} from '../toasts/toasts.service';
import { APIService } from '../services/api.service';

interface UploadProgress {
  filename: string;
  percentage: number;
  success: boolean;
  failed: boolean;
  invalidParams: any;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
@Injectable()
export class UploadComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public selected: boolean;
  public selectionName: string;
  public replace: APIPicture;
  public files: any[];
  public note: string;
  public progress: UploadProgress[] = [];
  public pictures: APIPicture[] = [];
  public item: APIItem;
  public formHidden = false;
  private perspectiveID: number;
  public user: APIUser;

  @ViewChild('input') input;

  constructor(
    private api: APIService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    public auth: AuthService,
    private pageEnv: PageEnvService,
    private modalService: NgbModal,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/29/name',
          pageId: 29
        }),
      0
    );

    this.auth.getUser().subscribe(user => (this.user = user));

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => ({
          perspective_id: parseInt(params.get('perspective_id'), 10),
          replace: parseInt(params.get('replace'), 10),
          item_id: parseInt(params.get('item_id'), 10),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          this.perspectiveID = params.perspective_id;
          const replace = params.replace;
          const itemId = params.item_id;

          return combineLatest([
            replace
              ? this.pictureService.getPicture(replace, {
                  fields: 'name_html'
                })
              : of(null),
            itemId
              ? this.itemService.getItem(itemId, {
                  fields: 'name_html'
                })
              : of(null)
          ]);
        })
      )
      .subscribe(([replace, item]) => {
        if (replace) {
          this.selected = true;
          this.replace = replace;
          this.selectionName = this.replace.name_html;
        }

        if (item) {
          this.selected = true;
          this.item = item;
          this.selectionName = this.item.name_html;
        }
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public onChange(event: any) {
    this.files = [].slice.call(event.target.files);
  }

  public submit() {
    this.progress = [];

    this.formHidden = true;

    const xhrs: Observable<APIPicture>[] = [];

    for (const file of this.files) {
      xhrs.push(this.uploadFile(file));
    }

    concat(...xhrs).subscribe({
      complete: () => {
        this.input.nativeElement.value = '';
        this.formHidden = false;
        this.files = undefined;
      }
    });

    return false;
  }

  private uploadFile(file: any): Observable<APIPicture> {
    const progress = {
      filename: file.fileName || file.name,
      percentage: 0,
      success: false,
      failed: false,
      invalidParams: {}
    };

    this.progress.push(progress);

    const formData: FormData = new FormData();
    formData.append('file', file);
    if (this.note) {
      formData.append('comment', this.note);
    }
    if (this.item) {
      formData.append('item_id', this.item.id + '');
    }
    if (this.replace) {
      formData.append('replace_picture_id', this.replace.id + '');
    }
    if (this.perspectiveID) {
      formData.append('perspective_id', this.perspectiveID + '');
    }

    return this.api
      .request('POST', 'picture', {
        body: formData,
        observe: 'events',
        reportProgress: true
      })
      .pipe(
        catchError(response => {
          progress.percentage = 100;
          progress.failed = true;

          progress.invalidParams = response.error.invalid_params;

          return EMPTY;
        }),
        switchMap(event => {
          if (event.type === HttpEventType.DownloadProgress) {
            progress.percentage = Math.round(
              50 + 25 * (event.loaded / event.total)
            );
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
              .getPictureByLocation(location, {
                fields:
                  'crop,image_gallery_full,thumb_medium,votes,views,comments_count,perspective_item,name_html,name_text'
              })
              .pipe(
                tap(picture => {
                  progress.percentage = 100;
                  this.pictures.push(picture);
                }),
                catchError(response => {
                  this.toastService.response(response);

                  return EMPTY;
                })
              );
          }

          return EMPTY;
        })
      );
  }

  public crop(picture: APIPicture) {
    const modalRef = this.modalService.open(UploadCropComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.picture = picture;
    modalRef.componentInstance.changed.subscribe(() => {
      this.api
        .request<void>('PUT', 'picture/' + picture.id, {body: {
          crop: picture.crop
        }})
        .subscribe(
          () => {
            this.pictureService
              .getPicture(picture.id, {
                fields: 'crop,thumb_medium'
              })
              .subscribe(
                response => {
                  picture.crop = response.crop;
                  picture.thumb_medium = response.thumb_medium;
                },
                response => this.toastService.response(response)
              );
          },
          response => this.toastService.response(response)
        );
    });

    return false;
  }
}
