import { Injectable } from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

export interface Toast {
  message: string;
  icon: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class ToastsService {
  public toasts: Toast[] = [];

  public show(options: Toast) {
    this.toasts.push(options);
  }

  public error(message: string) {
    this.show({
      message,
      type: 'danger',
      icon: 'fa fa-exclamation-triangle'
    });
  }

  public success(message: string) {
    this.show({
      message,
      type: 'success',
      icon: 'fa fa-check'
    });
  }

  public response(response: HttpResponse<any>) {
    if (response === undefined) {
      this.error('undefined');
      return;
    }
    this.error(response.status + ': ' + response.statusText);
  }

  public errorResponse(response: HttpErrorResponse) {
    if (response === undefined) {
      this.error('undefined');
      return;
    }
    this.error(response.status + ': ' + response.statusText);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
