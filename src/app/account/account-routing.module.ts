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

const routes: Routes = [
  {
    path: 'access',
    component: AccountAccessComponent,
    canActivate: [AuthGuard],
    title: $localize `Access Control`
  },
  {
    path: 'accounts',
    component: AccountAccountsComponent,
    canActivate: [AuthGuard],
    title: $localize `My accounts`
  },
  {
    path: 'contacts',
    component: AccountContactsComponent,
    canActivate: [AuthGuard],
    title: $localize `Contacts`
  },
  {
    path: 'delete',
    title: $localize `Account delete`,
    children: [
      { path: 'deleted', component: AccountDeletedComponent, title: $localize `Account deleted` },
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
    canActivate: [AuthGuard],
    title: $localize `My e-mail`
  },
  {
    path: 'inbox-pictures',
    component: AccountInboxPicturesComponent,
    canActivate: [AuthGuard],
    title: $localize `Unmoderated`
  },
  {
    path: 'messages',
    component: AccountMessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: AccountProfileComponent,
    canActivate: [AuthGuard],
    title: $localize `Profile`
  },
  {
    path: 'specs-conflicts',
    component: AccountSpecsConflictsComponent,
    canActivate: [AuthGuard],
    title: $localize `Conflicts`
  },
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
