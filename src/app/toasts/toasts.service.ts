import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpResponseBase} from '@angular/common/http';
import {GrpcStatusEvent} from '@ngx-grpc/common';

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

  public response(response: HttpResponseBase) {
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

  public grpcErrorResponse(event: GrpcStatusEvent) {
    if (event === undefined) {
      this.error('undefined');
      return;
    }
    this.error(event.statusMessage);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
