import {Component, OnInit} from '@angular/core';
import {LanguageService} from '@services/language';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-login',
  template: 'Redirecting …',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  constructor(private readonly languageService: LanguageService, private readonly keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.keycloak.login({
      redirectUri: window.location.href,
      locale: this.languageService.language,
    });
  }
}
