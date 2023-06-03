import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {environment} from '@environment/environment';

export interface Language {
  code: string;
  hostname: string;
  name: string;
  flag: string;
  locale: string;
}

@Injectable()
export class LanguageService {
  public readonly language: string = 'en';

  constructor(@Inject(LOCALE_ID) public readonly localeId: string) {
    for (const lang of environment.languages as Language[]) {
      if (lang.locale === localeId) {
        this.language = lang.code;
        break;
      }
    }
  }
}
