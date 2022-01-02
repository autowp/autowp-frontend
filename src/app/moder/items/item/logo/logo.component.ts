import {Component, Input} from '@angular/core';
import {APIItem} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {HttpEventType} from '@angular/common/http';
import {APIImage, APIService} from '../../../../services/api.service';
import {EMPTY} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-logo',
  templateUrl: './logo.component.html'
})
export class ModerItemsItemLogoComponent {
  @Input() item: APIItem;

  public canLogo$ = this.acl.isAllowed(Resource.BRAND, Privilege.LOGO);
  public progress: {
    filename: any;
    percentage: number;
    success: boolean;
    failed: boolean;
    invalidParams: any;
  } = null;

  constructor(private acl: ACLService, private api: APIService, private toastService: ToastsService) {}

  public onChange(event: any) {
    if (event.target.files.length <= 0) {
      return;
    }
    const file = event.target.files[0];

    this.progress = {
      filename: file.fileName || file.name,
      percentage: 0,
      success: false,
      failed: false,
      invalidParams: {}
    };

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.api
      .request('POST', 'item/' + this.item.id + '/logo', {
        body: formData,
        observe: 'events',
        reportProgress: true
      })
      .pipe(
        catchError(response => {
          this.progress.percentage = 100;
          this.progress.failed = true;

          this.progress.invalidParams = response.error.invalid_params;

          return EMPTY;
        }),
        switchMap(httpEvent => {
          if (httpEvent.type === HttpEventType.DownloadProgress) {
            this.progress.percentage = Math.round(
              50 + 25 * (httpEvent.loaded / httpEvent.total)
            );
            return EMPTY;
          }

          if (httpEvent.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(
              50 * (httpEvent.loaded / httpEvent.total)
            );
            return EMPTY;
          }

          if (httpEvent.type === HttpEventType.Response) {
            this.progress.percentage = 75;
            this.progress.success = true;

            return this.api
              .request<APIImage>('GET', 'item/' + this.item.id + '/logo')
              .pipe(
                tap(subresponse => {
                  this.progress.percentage = 100;
                  this.item.logo = subresponse;
                }),
                catchError(response => {
                  this.toastService.response(response);

                  return EMPTY;
                })
              );
          }

          return EMPTY;
        })
      )
      .subscribe();
  }
}
