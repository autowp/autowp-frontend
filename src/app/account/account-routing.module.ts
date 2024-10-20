import {Routes} from '@angular/router';

import {authGuard} from '../auth.guard';
import {AccountAccessComponent} from './access/access.component';
import {AccountComponent} from './account.component';
import {AccountAccountsComponent} from './accounts/accounts.component';
import {AccountContactsComponent} from './contacts/contacts.component';
import {AccountDeleteComponent} from './delete/delete.component';
import {AccountDeletedComponent} from './delete/deleted/deleted.component';
import {AccountEmailComponent} from './email/email.component';
import {AccountInboxPicturesComponent} from './inbox-pictures/inbox-pictures.component';
import {AccountMessagesComponent} from './messages/messages.component';
import {AccountProfileComponent} from './profile/profile.component';
import {AccountSpecsConflictsComponent} from './specs-conflicts/specs-conflicts.component';

export const routes: Routes = [
  {
    children: [
      {
        canActivate: [authGuard],
        component: AccountAccessComponent,
        path: 'access',
        title: $localize`Access Control`,
      },
      {
        canActivate: [authGuard],
        component: AccountAccountsComponent,
        path: 'accounts',
        title: $localize`My accounts`,
      },
      {
        canActivate: [authGuard],
        component: AccountContactsComponent,
        path: 'contacts',
        title: $localize`Contacts`,
      },
      {
        children: [
          {component: AccountDeletedComponent, path: 'deleted', title: $localize`Account deleted`},
          {
            canActivate: [authGuard],
            component: AccountDeleteComponent,
            path: '',
          },
        ],
        path: 'delete',
        title: $localize`Account delete`,
      },
      {
        canActivate: [authGuard],
        component: AccountEmailComponent,
        path: 'email',
        title: $localize`My e-mail`,
      },
      {
        canActivate: [authGuard],
        component: AccountInboxPicturesComponent,
        path: 'inbox-pictures',
        title: $localize`Unmoderated`,
      },
      {
        canActivate: [authGuard],
        component: AccountMessagesComponent,
        path: 'messages',
      },
      {
        canActivate: [authGuard],
        component: AccountProfileComponent,
        path: 'profile',
        title: $localize`Profile`,
      },
      {
        canActivate: [authGuard],
        component: AccountSpecsConflictsComponent,
        path: 'specs-conflicts',
        title: $localize`Conflicts`,
      },
    ],
    component: AccountComponent,
    path: '',
    title: $localize`Account`,
  },
  {path: '', pathMatch: 'full', redirectTo: 'profile'},
];
