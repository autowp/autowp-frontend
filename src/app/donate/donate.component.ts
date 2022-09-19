import { Component} from '@angular/core';
import { PageEnvService } from '../services/page-env.service';
import { LanguageService } from '../services/language';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html'
})
export class DonateComponent {
  public frameUrl: SafeResourceUrl;
  public language: string;

  constructor(
    private pageEnv: PageEnvService,
    private languageService: LanguageService,
    private domSanitizer: DomSanitizer
  ) {
    this.language = this.languageService.language;

    setTimeout(
      () =>
        this.pageEnv.set({pageId: 196}),
      0
    );

    /*const map = {
      account: '41001161017513',
      quickpay: 'donate',
      'payment-type-choice': 'on',
      'mobile-payment-type-choice': 'on',
      'default-sum': '100',
      targets: translations[0],
      'target-visibility': 'on',
      'project-name': translations[1],
      'project-site': 'https://' + window.location.host + '/',
      'button-text': '01',
      comment: 'on',
      hint: translations[2],
      successURL: 'https://' + window.location.host + '/donate/success'
    };*/

    const map = {
      writer: 'seller',
      targets: $localize `For website work`,
      'targets-hint': $localize `Your wish`,
      'default-sum': '100',
      'payment-type-choice': 'on',
      'mobile-payment-type-choice': 'on',
      successURL: 'https://' + window.location.host + '/donate/success',
      comment: 'on',
      hint: $localize `Your wish`,
      account: '41001161017513',
      quickpay: 'shop',
      'button-text': '14',
      'target-visibility': 'on',
      'project-name': $localize `WheelsAge.org`,
      'project-site': 'https://' + window.location.host + '/',
    };

    const url = new URL('https://yoomoney.ru/quickpay/shop-widget');
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        url.searchParams.append(key, map[key]);
      }
    }

    this.frameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }
}
