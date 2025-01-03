import {Component, inject, OnInit} from '@angular/core';
import {LanguageService} from '@services/language';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-login',
  standalone: true,
  styleUrls: [],
  template: 'Redirecting …',
})
export class LoginComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  private readonly keycloak = inject(Keycloak);

  ngOnInit(): void {
    this.keycloak.login({
      locale: this.languageService.language,
      redirectUri: window.location.href,
    });
  }
}
