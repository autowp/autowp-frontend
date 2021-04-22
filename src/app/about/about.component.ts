import { Component, OnInit, OnDestroy } from '@angular/core';
import * as showdown from 'showdown';
import * as escapeRegExp from 'lodash.escaperegexp';
import { UserService, APIUser } from '../services/user';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BytesPipe } from 'ngx-pipes';
import { PageEnvService } from '../services/page-env.service';
import { Subscription } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { APIService } from '../services/api.service';

export interface APIAbout {
  developer: number;
  fr_translator: number;
  zh_translator: number;
  be_translator: number;
  pt_br_translator: number;
  contributors: number[];
  total_pictures: number;
  pictures_size: number;
  total_users: number;
  total_cars: number;
  total_comments: number;
}

function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function replacePairs(str: string, pairs: { [key: string]: string }): string {
  for (const key in pairs) {
    if (pairs.hasOwnProperty(key)) {
      str = replaceAll(str, String(key), pairs[key]);
    }
  }
  return str;
}

const aboutText = $localize `### People

Своим существованием наш проект обязан людям, приходящим сюда и вкладывающим своё время и знания.

Кто-то добавляет материалы, а кто-то помогает найти ошибки в уже имеющихся. Кто-то специализируется на конкретной марке, а кто-то успевает за всем. Кто-то без лишнего внимания со стороны наполняет сайт шаг за шагом, а кто-то собирает овации редкими, но жгучими фото.

Нас много и мы разные, и это прекрасно. Вот лишь некоторые из нас:

%users%

#### "Цветовая дифференциация штанов"

Так завелось, что мы выделяем некоторых наших людей особым цветом - зеленым. Не просто так - это особая метка. Знайте, если вы видите кого-то из "зеленых", вы всегда можете схватить его и спросить о чем угодно вокруг нашего проекта, потому что "зеленые" - это самые отзывчивые и заинтересованные в жизни проекта люди.

Некоторая часть "зеленых" наделена модераторскими функциями.

### Feedback

Если у вас есть какие-то замечания, предложения или иные мысли, вы можете озвучить их на [форуме](/forums/), задать лично через систему обмена сообщениями или написать в "[обратную связь](/feedback)" администрации сайта.

Если у вас есть вопросы о размещении рекламы, обмена ссылками или продвижении вашего продукта иными способами, все они имеют единственный ответ: мы не размещаем рекламу.

### Numbers

Так сложилось, что мы любим тешить своё тщеславие большими цифрами, а также всем их показывать. Вашему вниманию некоторые из них:

* на сайте более %total-pictures% изображений, %total-vehicles% автомобилей, что составляет порядка %total-size% данных
* зарегистрировано около %total-users% пользователей, оставивших более %total-comments% сообщений

### Development

Разработка и поддержка проекта ведется в основном силами %developer% ([contributors](https://github.com/autowp/autowp/graphs/contributors))

French site translation: %fr-translator%

Chinese site translation: %zh-translator%

Belarusian site translation: %be-translator%

Brazilian portuguese site translation: %pt-br-translator%

Сайт работает на [Zend Framework](http://framework.zend.com/), [jQuery](http://jquery.com/), [Twitter bootstrap](http://getbootstrap.com/), а также многих других "умных словах".

Исходный код сайта является открытым, чтобы каждый желающий имел возможность влиять на суть и качество проекта.

%github%

[![Build Status](https://travis-ci.org/autowp/autowp.svg?branch=master)](https://travis-ci.org/autowp/autowp)
[![Code Climate](https://codeclimate.com/github/autowp/autowp/badges/gpa.svg)](https://codeclimate.com/github/autowp/autowp)
[![Coverage Status](https://coveralls.io/repos/github/autowp/autowp/badge.svg?branch=master)](https://coveralls.io/github/autowp/autowp?branch=master)

### Поддержать проект

You can support our project by [finances](/donate) or [moral](/feedback).
Take part in [the translation of the site](https://github.com/autowp/autowp/tree/master/module/Application/language) into other languages.`;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit, OnDestroy {
  public html = '';
  private sub: Subscription;

  constructor(
    private api: APIService,
    private userService: UserService,
    private router: Router,
    private decimalPipe: DecimalPipe,
    private bytesPipe: BytesPipe,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `About us`,
          pageId: 136
        }),
      0
    );

    this.sub = this.api.request<APIAbout>('GET', 'about').pipe(
      switchMap(about => {
        const ids: number[] = about.contributors;
        ids.push(about.developer);
        ids.push(about.fr_translator);
        ids.push(about.zh_translator);
        ids.push(about.be_translator);
        ids.push(about.pt_br_translator);

        return this.userService.getUserMap(ids).pipe(
          map(users => ({
            users,
            aboutText,
            about
          }))
        );
      })
    ).subscribe(data => {
      const contributorsHtml: string[] = [];
      for (const id of data.about.contributors) {
        contributorsHtml.push(this.userHtml(data.users.get(id)));
      }

      const markdownConverter = new showdown.Converter({});
      this.html = replacePairs(markdownConverter.makeHtml(data.aboutText), {
        '%users%': contributorsHtml.join(' '),
        '%total-pictures%': this.decimalPipe.transform(
          data.about.total_pictures
        ),
        '%total-vehicles%': data.about.total_cars.toString(),
        '%total-size%': this.bytesPipe
          .transform(data.about.pictures_size, 1)
          .toString(),
        '%total-users%': data.about.total_users.toString(),
        '%total-comments%': data.about.total_comments.toString(),
        '%github%':
          '<i class="fa fa-github" aria-hidden="true"></i> ' +
          '<a href="https://github.com/autowp/autowp">https://github.com/autowp/autowp</a>',
        '%developer%': this.userHtml(data.users.get(data.about.developer)),
        '%fr-translator%': this.userHtml(
          data.users.get(data.about.fr_translator)
        ),
        '%zh-translator%': this.userHtml(
          data.users.get(data.about.zh_translator)
        ),
        '%be-translator%': this.userHtml(
          data.users.get(data.about.be_translator)
        ),
        '%pt-br-translator%': this.userHtml(
          data.users.get(data.about.pt_br_translator)
        )
      });
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private userHtml(user: APIUser): string {
    const span = document.createElement('span');
    const classes = ['user'];
    if (user.deleted) {
      classes.push('muted');
    }
    if (user.long_away) {
      classes.push('long-away');
    }
    if (user.green) {
      classes.push('green-man');
    }
    span.setAttribute('class', classes.join(' '));
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      this.router
        .createUrlTree([
          '/users',
          user.identity ? user.identity : 'user' + user.id
        ])
        .toString()
    );
    a.innerText = user.name;

    return '<i class="fa fa-user" aria-hidden="true"></i> ' + span.appendChild(a).outerHTML;
  }
}
