import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    const chunkFailedMessage = /Loading chunk \d+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}
