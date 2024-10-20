import {Component, inject, OnInit} from '@angular/core';
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

  ngOnInit(): void {
    this.keycloak.login({
      locale: this.languageService.language,
      redirectUri: window.location.href,
    });
  }
}
