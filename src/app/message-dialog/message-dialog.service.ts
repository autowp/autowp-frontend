import {inject, Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ModalMessageComponent} from './modal-message/modal-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageDialogService {
  private readonly modalService = inject(NgbModal);

  public showDialog(userId: string, sentCallback?: () => void, cancelCallback?: () => void) {
    const modalRef = this.modalService.open(ModalMessageComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.result.then(
      () => {
        if (sentCallback) {
          sentCallback();
        }
      },
      () => {
        if (cancelCallback) {
          cancelCallback();
        }
      },
    );
    modalRef.componentInstance.userId = userId;
  }
}
