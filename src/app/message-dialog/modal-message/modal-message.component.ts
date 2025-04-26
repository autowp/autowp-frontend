import {Component, inject, input} from '@angular/core';
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
  readonly #messageService = inject(MessageService);
  readonly #toastService = inject(ToastsService);

  readonly userId = input.required<string>();

  protected text = '';
  protected sending = false;
  protected sent = false;

  protected send() {
    this.sending = true;
    this.sent = false;

    const userId = this.userId();
    if (userId) {
      this.#messageService.send$(userId, this.text).subscribe({
        error: (response: unknown) => this.#toastService.handleError(response),
        next: () => {
          this.sending = false;
          this.sent = true;
          this.text = '';

          this.activeModal.close();

          this.#toastService.success('Ok');
        },
      });
    }
  }

  protected keypress() {
    this.sent = false;
  }
}
