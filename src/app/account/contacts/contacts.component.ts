import {Component} from '@angular/core';
import {Contact, DeleteContactRequest} from '@grpc/spec.pb';
import {ContactsClient} from '@grpc/spec.pbsc';
import {AuthService} from '@services/auth.service';
import {ContactsService} from '@services/contacts';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {KeycloakService} from 'keycloak-angular';
import {EMPTY} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-contacts',
  templateUrl: './contacts.component.html',
})
export class AccountContactsComponent {
  protected items: Contact[] = [];

  constructor(
    private readonly contactsService: ContactsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly auth: AuthService,
    private readonly contacts: ContactsClient,
    private readonly languageService: LanguageService,
    private readonly keycloak: KeycloakService
  ) {
    setTimeout(() => this.pageEnv.set({pageId: 198}), 0);

    this.auth
      .getUser$()
      .pipe(
        map((user) => {
          if (!user) {
            this.keycloak.login({
              locale: this.languageService.language,
              redirectUri: window.location.href,
            });
            return EMPTY;
          }
          return user;
        }),
        switchMap(() => this.contactsService.getContacts$())
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: (response) => {
          this.items = response.items;
        },
      });
  }

  protected deleteContact(id: string) {
    this.contacts.deleteContact(new DeleteContactRequest({userId: id})).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].contactUserId === id) {
            this.items.splice(i, 1);
            break;
          }
        }
      },
    });
    return false;
  }
}
