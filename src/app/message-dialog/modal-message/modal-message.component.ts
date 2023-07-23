import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '@services/message';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
})
export class ModalMessageComponent {
  @Input() userId: string;

  protected text = '';
  protected sending = false;
  protected sent = false;

  constructor(
    protected readonly activeModal: NgbActiveModal,
    private readonly messageService: MessageService,
    private readonly toastService: ToastsService
  ) {}

  protected send() {
    this.sending = true;
    this.sent = false;

    this.messageService.send$(this.userId, this.text).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.sending = false;
        this.sent = true;
        this.text = '';

        this.activeModal.close();

        this.toastService.success('Ok');
      },
    });
  }

  protected keypress() {
    this.sent = false;
  }
}
