import { Component, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageEnvService } from '../services/page-env.service';
import { LanguageService } from '../services/language';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html'
})
@Injectable()
export class DonateComponent {
  public frameUrl: SafeResourceUrl;
  public language: string;

  constructor(
    private translate: TranslateService,
    private pageEnv: PageEnvService,
    private languageService: LanguageService,
    private domSanitizer: DomSanitizer
  ) {
    this.language = this.languageService.getLanguage();

    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          name: 'page/196/name',
          pageId: 196
        }),
      0
    );

    this.translate
      .get(['donate/target', 'donate/project', 'donate/comment-hint'])
      .subscribe((translations: string[]) => {
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

        console.log(translations);

        const map = {
          writer: 'seller',
          targets: translations['donate/target'],
          'targets-hint': translations['donate/comment-hint'],
          'default-sum': '100',
          'payment-type-choice': 'on',
          'mobile-payment-type-choice': 'on',
          successURL: 'https://' + window.location.host + '/donate/success',
          comment: 'on',
          hint: translations['donate/comment-hint'],
          account: '41001161017513',
          quickpay: 'shop',
          'button-text': '14',
          'target-visibility': 'on',
          'project-name': translations['donate/project'],
          'project-site': 'https://' + window.location.host + '/',
        };

        const url = new URL('https://money.yandex.ru/quickpay/shop-widget');
        for (const key in map) {
          if (map.hasOwnProperty(key)) {
            url.searchParams.append(key, map[key]);
          }
        }

        this.frameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url.toString());
      });
  }
}
