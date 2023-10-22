import {Component, OnInit} from '@angular/core';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-login',
  styleUrls: [],
  template: 'Redirecting …',
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly languageService: LanguageService,
    private readonly keycloak: KeycloakService,
  ) {}

  ngOnInit(): void {
    this.keycloak.login({
      locale: this.languageService.language,
      redirectUri: window.location.href,
    });
  }
}
