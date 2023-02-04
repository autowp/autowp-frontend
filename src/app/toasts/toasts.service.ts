import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpResponseBase} from '@angular/common/http';
import {GrpcStatusEvent} from '@ngx-grpc/common';

export interface Toast {
  message: string;
  icon: string;
  type: string;
}

@Injectable({providedIn: 'root'})
export class ToastsService {
  public toasts: Toast[] = [];

  public handleError(error: unknown) {
    if (typeof error === 'string') {
      this.error(error);
      return;
    }

    if (typeof error === 'object') {
      if (error instanceof HttpErrorResponse) {
        this.errorResponse(error);
        return;
      }

      if (error instanceof GrpcStatusEvent) {
        this.grpcErrorResponse(error);
        return;
      }

      if (error instanceof Error) {
        this.error(error.message);
        return;
      }
    }

    console.error(error);
    this.error('undefined');
  }

  public show(options: Toast) {
    this.toasts.push(options);
  }

  public error(message: string) {
    this.show({
      message,
      type: 'danger',
      icon: 'bi bi-exclamation-triangle',
    });
  }

  public success(message: string) {
    this.show({
      message,
      type: 'success',
      icon: 'bi bi-check',
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
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
