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

  public text = '';
  public sending = false;
  public sent = false;

  constructor(
    public activeModal: NgbActiveModal,
    private messageService: MessageService,
    private toastService: ToastsService
  ) {}

  public send() {
    this.sending = true;
    this.sent = false;

    this.messageService.send$(this.userId, this.text).subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        this.text = '';

        this.activeModal.close();

        this.toastService.success('Ok');
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }

  public keypress() {
    this.sent = false;
  }
}
