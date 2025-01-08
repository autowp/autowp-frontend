import type {APIItem} from '@services/item';

import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, inject, Input} from '@angular/core';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIImage, APIService} from '@services/api.service';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {EMPTY} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  imports: [MarkdownComponent, NgbProgressbar, AsyncPipe, InvalidParamsPipe],
  selector: 'app-moder-items-item-logo',
  templateUrl: './logo.component.html',
})
export class ModerItemsItemLogoComponent {
  private readonly acl = inject(ACLService);
  private readonly api = inject(APIService);
  private readonly toastService = inject(ToastsService);

  @Input() item?: APIItem;

  protected readonly canLogo$ = this.acl.isAllowed$(Resource.BRAND, Privilege.LOGO);
  protected progress: null | {
    failed: boolean;
    filename: string;
    invalidParams: InvalidParams;
    percentage: number;
    success: boolean;
  } = null;

  protected onChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || files.length <= 0) {
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

    if (this.item) {
      this.api
        .request$('POST', 'item/' + this.item.id + '/logo', {
          body: formData,
          observe: 'events',
          reportProgress: true,
        })
        .pipe(
          catchError((response: unknown) => {
            if (response instanceof HttpErrorResponse) {
              if (this.progress) {
                this.progress.percentage = 100;
                this.progress.failed = true;

                this.progress.invalidParams = response.error.invalid_params;
              }
            }

            return EMPTY;
          }),
          switchMap((httpEvent) => {
            if (httpEvent.type === HttpEventType.DownloadProgress) {
              if (this.progress && httpEvent.total) {
                this.progress.percentage = Math.round(50 + 25 * (httpEvent.loaded / httpEvent.total));
              }
              return EMPTY;
            }

            if (httpEvent.type === HttpEventType.UploadProgress) {
              if (this.progress && httpEvent.total) {
                this.progress.percentage = Math.round(50 * (httpEvent.loaded / httpEvent.total));
              }
              return EMPTY;
            }

            if (httpEvent.type === HttpEventType.Response) {
              if (this.progress) {
                this.progress.percentage = 75;
                this.progress.success = true;
              }

              if (!this.item) {
                return EMPTY;
              }

              return this.api.request$<APIImage>('GET', 'item/' + this.item.id + '/logo').pipe(
                tap((subresponse) => {
                  if (this.progress) {
                    this.progress.percentage = 100;
                  }
                  if (this.item) {
                    this.item.logo = subresponse;
                  }
                }),
                catchError((response: unknown) => {
                  this.toastService.handleError(response);

                  return EMPTY;
                }),
              );
            }

            return EMPTY;
          }),
        )
        .subscribe();
    }
  }
}
