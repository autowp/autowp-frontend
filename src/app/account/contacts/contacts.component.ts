import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Contact, DeleteContactRequest} from '@grpc/spec.pb';
import {ContactsClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '@services/auth.service';
import {ContactsService} from '@services/contacts';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';
import Keycloak from 'keycloak-js';

@Component({
  imports: [RouterLink, UserComponent, NgbTooltip, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-account-contacts',
  templateUrl: './contacts.component.html',
})
export class AccountContactsComponent implements OnInit {
  private readonly contactsService = inject(ContactsService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly auth = inject(AuthService);
  private readonly contacts = inject(ContactsClient);
  private readonly languageService = inject(LanguageService);
  private readonly keycloak = inject(Keycloak);

  private readonly reload$ = new BehaviorSubject<void>(void 0);

  protected readonly items$: Observable<Contact[]> = this.auth.getUser$().pipe(
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
    switchMap(() => this.reload$),
    switchMap(() => this.contactsService.getContacts$()),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
    map((response) => response.items || []),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 198}), 0);
  }

  protected deleteContact(id: string) {
    this.contacts.deleteContact(new DeleteContactRequest({userId: id})).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.reload$.next(void 0);
      },
    });
    return false;
  }
}
