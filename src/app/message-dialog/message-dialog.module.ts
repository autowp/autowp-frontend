import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {MessageDialogService} from './message-dialog.service';
import {ModalMessageComponent} from './modal-message/modal-message.component';

@NgModule({
  declarations: [ModalMessageComponent],
  imports: [CommonModule, NgbModalModule, FormsModule],
  providers: [MessageDialogService],
})
export class MessageDialogModule {}
