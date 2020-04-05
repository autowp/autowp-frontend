import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountAccessComponent } from './access/access.component';
import { UtilsModule } from '../utils/utils.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AccountSidebarComponent } from './sidebar/sidebar.component';
import { AccountAccountsComponent } from './accounts/accounts.component';
import { AccountContactsComponent } from './contacts/contacts.component';
import { UserModule } from '../user/user.module';
import { MomentModule } from 'ngx-moment';
import { AccountDeletedComponent } from './delete/deleted/deleted.component';
import { AccountDeleteComponent } from './delete/delete.component';
import { AccountEmailComponent } from './email/email.component';
import { AccountEmailcheckComponent } from './emailcheck/emailcheck.component';
import { AccountInboxPicturesComponent } from './inbox-pictures/inbox-pictures.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { ThumbnailModule } from '../thumbnail/thumbnail.module';
import { AccountMessagesComponent } from './messages/messages.component';
import { AccountProfileComponent } from './profile/profile.component';
import { AccountSpecsConflictsComponent } from './specs-conflicts/specs-conflicts.component';
import { AccountComponent } from './account.component';
import { NgbTooltipModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { APIAttrsModule } from '../api/attrs/attrs.module';
import { MessageDialogModule } from '../message-dialog/message-dialog.module';

@NgModule({
  declarations: [
    AccountAccessComponent,
    AccountSidebarComponent,
    AccountAccountsComponent,
    AccountContactsComponent,
    AccountDeletedComponent,
    AccountDeleteComponent,
    AccountEmailComponent,
    AccountEmailcheckComponent,
    AccountInboxPicturesComponent,
    AccountMessagesComponent,
    AccountProfileComponent,
    AccountSpecsConflictsComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    UtilsModule,
    TranslateModule,
    FormsModule,
    UserModule,
    MomentModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    PaginatorModule,
    ThumbnailModule,
    APIAttrsModule,
    MessageDialogModule
  ]
})
export class AccountModule {}
