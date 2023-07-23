import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbProgressbarModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilsModule} from '@utils/utils.module';

import {APIAttrsModule} from '../api/attrs/attrs.module';
import {MessageDialogModule} from '../message-dialog/message-dialog.module';
import {PaginatorModule} from '../paginator/paginator.module';
import {ThumbnailModule} from '../thumbnail/thumbnail.module';
import {UserModule} from '../user/user.module';
import {AccountAccessComponent} from './access/access.component';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import {AccountAccountsComponent} from './accounts/accounts.component';
import {AccountContactsComponent} from './contacts/contacts.component';
import {AccountDeleteComponent} from './delete/delete.component';
import {AccountDeletedComponent} from './delete/deleted/deleted.component';
import {AccountEmailComponent} from './email/email.component';
import {AccountInboxPicturesComponent} from './inbox-pictures/inbox-pictures.component';
import {AccountMessagesComponent} from './messages/messages.component';
import {AccountProfileComponent} from './profile/profile.component';
import {AccountSpecsConflictsComponent} from './specs-conflicts/specs-conflicts.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountAccessComponent,
    AccountAccountsComponent,
    AccountContactsComponent,
    AccountDeletedComponent,
    AccountDeleteComponent,
    AccountEmailComponent,
    AccountInboxPicturesComponent,
    AccountMessagesComponent,
    AccountProfileComponent,
    AccountSpecsConflictsComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    UtilsModule,
    FormsModule,
    UserModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    PaginatorModule,
    ThumbnailModule,
    APIAttrsModule,
    MessageDialogModule,
  ],
})
export class AccountModule {}
