import {isPlatformBrowser} from '@angular/common';
import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  styleUrls: [],
  template: 'Redirecting …',
})
export class LoginComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  private readonly keycloak = inject(KeycloakService);
  private readonly platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.keycloak.login({
        locale: this.languageService.language,
        redirectUri: window.location.href,
      });
    }
  }
}
