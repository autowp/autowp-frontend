import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { environment } from '../../environments/environment';

export interface Language {
  code: string;
  hostname: string;
  name: string;
  flag: string;
  momentLocale: string;
  locale: string;
}

@Injectable()
export class LanguageService {
  public readonly language: string = 'en';
  public readonly momentLocale: string = 'en-gb';

  constructor(@Inject(LOCALE_ID) public localeId: string) {
    for (const lang of environment.languages as Language[]) {
      if (lang.locale === localeId) {
        this.language = lang.code;
        this.momentLocale = lang.momentLocale;
        break;
      }
    }
  }
}
