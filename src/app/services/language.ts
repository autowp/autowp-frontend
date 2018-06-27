import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';

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
}

@Injectable()
export class LanguageService {
  private language = 'en';
  private languages: Language[] = [
    {
      code: 'en',
      ngxTranslateCode: 'en',
      hostname: 'en.wheelsage.org',
      name: 'English',
      flag: 'flag-icon flag-icon-gb'
    },
    {
      code: 'zh',
      ngxTranslateCode: 'zh',
      hostname: 'zh.wheelsage.org',
      name: '中文 (beta)',
      flag: 'flag-icon flag-icon-cn'
    },
    {
      code: 'ru',
      ngxTranslateCode: 'ru',
      hostname: 'www.autowp.ru',
      name: 'Русский',
      flag: 'flag-icon flag-icon-ru'
    },
    {
      code: 'pt-br',
      ngxTranslateCode: 'br',
      hostname: 'br.wheelsage.org',
      name: 'Português brasileiro',
      flag: 'flag-icon flag-icon-br'
    },
    {
      code: 'fr',
      ngxTranslateCode: 'fr',
      hostname: 'fr.wheelsage.org',
      name: 'Français (beta)',
      flag: 'flag-icon flag-icon-fr'
    },
    {
      code: 'be',
      ngxTranslateCode: 'be',
      hostname: 'be.wheelsage.org',
      name: 'Беларуская',
      flag: 'flag-icon flag-icon-by'
    },
    {
      code: 'uk',
      ngxTranslateCode: 'uk',
      hostname: 'uk.wheelsage.org',
      name: 'Українська (beta)',
      flag: 'flag-icon flag-icon-ua'
    }
  ];

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

  public getLanguages(): Language[] {
    return this.languages;
  }
}
