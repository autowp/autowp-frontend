import {Component, inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-donate',
  styleUrls: ['./donate.component.scss'],
  templateUrl: './donate.component.html',
})
export class DonateComponent implements OnInit {
  private readonly pageEnv = inject(PageEnvService);
  private readonly languageService = inject(LanguageService);
  private readonly domSanitizer = inject(DomSanitizer);

  protected frameUrl: SafeResourceUrl;
  protected readonly language: string = this.languageService.language;

  constructor() {
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

    const map: {
      [key: string]: string;
    } = {
      account: '41001161017513',
      'button-text': '14',
      comment: 'on',
      'default-sum': '100',
      hint: $localize`Your wish`,
      'mobile-payment-type-choice': 'on',
      'payment-type-choice': 'on',
      'project-name': $localize`WheelsAge.org`,
      'project-site': 'https://' + window.location.host + '/',
      quickpay: 'shop',
      successURL: 'https://' + window.location.host + '/donate/success',
      'target-visibility': 'on',
      targets: $localize`For website work`,
      'targets-hint': $localize`Your wish`,
      writer: 'seller',
    };

    const url = new URL('https://yoomoney.ru/quickpay/shop-widget');
    for (const key in map) {
      url.searchParams.append(key, map[key]);
    }

    this.frameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
  }

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 196}), 0);
  }
}
