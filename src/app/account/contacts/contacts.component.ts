import { Component} from '@angular/core';
import { ContactsService } from '../../services/contacts';
import { PageEnvService } from '../../services/page-env.service';
import {ToastsService} from '../../toasts/toasts.service';
import {map, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Contact, DeleteContactRequest} from '../../../../generated/spec.pb';
import {ContactsClient} from '../../../../generated/spec.pbsc';
import {LanguageService} from '../../services/language';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-account-contacts',
  templateUrl: './contacts.component.html'
})
export class AccountContactsComponent {
  public items: Contact[] = [];

  constructor(
    private contactsService: ContactsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private auth: AuthService,
    private contacts: ContactsClient,
    private languageService: LanguageService,
    private keycloak: KeycloakService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({pageId: 198}),
      0
    );

    this.auth.getUser().pipe(
      map(user => {
        if (! user) {
          this.keycloak.login({
            redirectUri: window.location.href,
            locale: this.languageService.language
          });
          return EMPTY;
        }
        return user;
      }),
      switchMap(() => this.contactsService.getContacts({
        fields: ['avatar', 'gravatar', 'last_online']
      }))
    ).subscribe({
      next: response => {
        this.items = response.items;
      },
      error: response => this.toastService.response(response)
    });
  }

  public deleteContact(id: string) {
    this.contacts.deleteContact(new DeleteContactRequest({userId: id})).subscribe(
      () => {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].contactUserId === id) {
            this.items.splice(i, 1);
            break;
          }
        }
      },
      response => this.toastService.response(response)
    );
    return false;
  }
}
