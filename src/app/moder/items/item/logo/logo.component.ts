import {AsyncPipe} from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {APIItem} from '@grpc/spec.pb';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {AuthService, Role} from '@services/auth.service';
import {InvalidParams, InvalidParamsPipe} from '@utils/invalid-params.pipe';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Component({
  imports: [MarkdownComponent, NgbProgressbar, AsyncPipe, InvalidParamsPipe],
  selector: 'app-moder-items-item-logo',
  templateUrl: './logo.component.html',
})
export class ModerItemsItemLogoComponent {
  readonly #auth = inject(AuthService);
  readonly #http = inject(HttpClient);

  @Input() item?: APIItem;
  @Output() itemUpdated = new EventEmitter<void>();

  protected readonly canLogo$ = this.#auth.hasRole$(Role.BRANDS_MODER);
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
      this.#http
        .request('POST', '/api/item/' + this.item.id + '/logo', {
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
                this.progress.percentage = 100;
                this.progress.success = true;
              }

              if (!this.item) {
                return EMPTY;
              }

              this.itemUpdated.emit(void 0);
            }

            return EMPTY;
          }),
        )
        .subscribe();
    }
  }
}
