import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAccessComponent } from './access/access.component';
import { AuthGuard } from '../auth.guard';
import { AccountAccountsComponent } from './accounts/accounts.component';
import { AccountContactsComponent } from './contacts/contacts.component';
import { AccountDeletedComponent } from './delete/deleted/deleted.component';
import { AccountDeleteComponent } from './delete/delete.component';
import { AccountEmailComponent } from './email/email.component';
import { AccountInboxPicturesComponent } from './inbox-pictures/inbox-pictures.component';
import { AccountMessagesComponent } from './messages/messages.component';
import { AccountProfileComponent } from './profile/profile.component';
import { AccountSpecsConflictsComponent } from './specs-conflicts/specs-conflicts.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: 'access',
    component: AccountAccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accounts',
    component: AccountAccountsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: AccountContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delete',
    children: [
      { path: 'deleted', component: AccountDeletedComponent },
      {
        path: '',
        component: AccountDeleteComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'email',
    component: AccountEmailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox-pictures',
    component: AccountInboxPicturesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: AccountMessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: AccountProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'specs-conflicts',
    component: AccountSpecsConflictsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: AccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
