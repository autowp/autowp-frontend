import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from './modal-message/modal-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  constructor(private modalService: NgbModal) {}

  public showDialog(
    userId: string,
    sentCallback?: () => void,
    cancelCallback?: () => void
  ) {
    const modalRef = this.modalService.open(ModalMessageComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.result.then(
      result => {
        if (sentCallback) {
          sentCallback();
        }
      },
      reason => {
        if (cancelCallback) {
          cancelCallback();
        }
      }
    );
    modalRef.componentInstance.userId = userId;
  }
}
