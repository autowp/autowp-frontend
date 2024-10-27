import {isPlatformBrowser} from '@angular/common';
import {ErrorHandler, inject, Injectable, PLATFORM_ID} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly platform = inject(PLATFORM_ID);

  handleError(error: Error): void {
    const chunkFailedMessage = /Loading chunk \d+ failed/;

    if (chunkFailedMessage.test(error.message) && isPlatformBrowser(this.platform)) {
      window.location.reload();
    }
  }
}
