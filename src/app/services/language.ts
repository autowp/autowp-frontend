import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface APILanguageGetResponse {
  items: {
    [key: string]: string;
  };
}

export interface Language {
  code: string;
  ngxTranslateCode: string;
  hostname: string;
  name: string;
  flag: string;
  momentLocale: string;
}

@Injectable()
export class LanguageService {
  private language = 'en';
  private languages: Language[] = environment.languages;

  constructor() {
    for (const lang of this.languages) {
      if (lang.hostname === document.location.hostname) {
        this.language = lang.code;
        break;
      }
    }
  }

  public getLanguage() {
    return this.language;
  }

  public getNgxTranslateLanguage() {
    for (const lang of this.languages) {
      if (lang.code === this.language) {
        return lang.ngxTranslateCode;
      }
    }

    return this.language;
  }

  public getMomentLocale() {
    for (const lang of this.languages) {
      if (lang.code === this.language) {
        return lang.momentLocale;
      }
    }

    return this.language;
  }

  public getLanguages(): Language[] {
    return this.languages;
  }
}
