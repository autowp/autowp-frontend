import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, Input} from '@angular/core';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage, APIService} from '@services/api.service';
import {APIItem} from '@services/item';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {EMPTY} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-logo',
  templateUrl: './logo.component.html',
})
export class ModerItemsItemLogoComponent {
  @Input() item: APIItem;

  protected readonly canLogo$ = this.acl.isAllowed$(Resource.BRAND, Privilege.LOGO);
  protected progress: {
    failed: boolean;
    filename: string;
    invalidParams: InvalidParams;
    percentage: number;
    success: boolean;
  } = null;

  constructor(
    private readonly acl: ACLService,
    private readonly api: APIService,
    private readonly toastService: ToastsService
  ) {}

  protected onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files.length <= 0) {
      return;
    }
    const file = files[0];

    this.progress = {
      failed: false,
      filename: file.name,
      invalidParams: {},
      percentage: 0,
      success: false,
    };

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.api
      .request('POST', 'item/' + this.item.id + '/logo', {
        body: formData,
        observe: 'events',
        reportProgress: true,
      })
      .pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse) {
            this.progress.percentage = 100;
            this.progress.failed = true;

            this.progress.invalidParams = response.error.invalid_params;
          }

          return EMPTY;
        }),
        switchMap((httpEvent) => {
          if (httpEvent.type === HttpEventType.DownloadProgress) {
            this.progress.percentage = Math.round(50 + 25 * (httpEvent.loaded / httpEvent.total));
            return EMPTY;
          }

          if (httpEvent.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(50 * (httpEvent.loaded / httpEvent.total));
            return EMPTY;
          }

          if (httpEvent.type === HttpEventType.Response) {
            this.progress.percentage = 75;
            this.progress.success = true;

            return this.api.request<APIImage>('GET', 'item/' + this.item.id + '/logo').pipe(
              tap((subresponse) => {
                this.progress.percentage = 100;
                this.item.logo = subresponse;
              }),
              catchError((response: unknown) => {
                this.toastService.handleError(response);

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
