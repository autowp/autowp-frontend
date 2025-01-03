import {Component, inject, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '@services/message';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [FormsModule],
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
})
export class ModalMessageComponent {
  protected readonly activeModal = inject(NgbActiveModal);
  private readonly messageService = inject(MessageService);
  private readonly toastService = inject(ToastsService);

  @Input() userId?: string;

  protected text = '';
  protected sending = false;
  protected sent = false;

  protected send() {
    this.sending = true;
    this.sent = false;

    if (this.userId) {
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
  }

  protected keypress() {
    this.sent = false;
  }
}
