import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { FormsModule } from '@angular/forms';
import { MessageDialogService } from './message-dialog.service';

@NgModule({
  declarations: [ModalMessageComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    TranslateModule,
    FormsModule
  ],
  entryComponents: [
    ModalMessageComponent
  ],
  providers: [
    MessageDialogService
  ]
})
export class MessageDialogModule { }
