import {Component, OnInit} from '@angular/core';
import * as showdown from 'showdown';
import * as escapeRegExp from 'lodash.escaperegexp';
import {UserService, APIUser} from '../services/user';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {BytesPipe} from 'ngx-pipes';
import {PageEnvService} from '../services/page-env.service';
import {map, switchMap} from 'rxjs/operators';
import {StatisticsClient} from '../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';

function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function replacePairs(str: string, pairs: {[key: string]: string}): string {
  for (const key in pairs) {
    if (pairs.hasOwnProperty(key)) {
      str = replaceAll(str, String(key), pairs[key]);
    }
  }
  return str;
}

const aboutText = $localize`### People

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
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  public version = require('../../version.json');

  public html$ = this.statGrpc
    .getAboutData(new Empty())
    .pipe(
      switchMap((about) => {
        const ids: string[] = about.contributors;
        ids.push(about.developer);
        ids.push(about.frTranslator);
        ids.push(about.zhTranslator);
        ids.push(about.beTranslator);
        ids.push(about.ptBrTranslator);

        return this.userService.getUserMap(ids).pipe(
          map((users) => ({
            users,
            aboutText,
            about,
          }))
        );
      })
    )
    .pipe(
      map((data) => {
        const contributorsHtml: string[] = [];
        for (const id of data.about.contributors) {
          contributorsHtml.push(this.userHtml(data.users.get(id)));
        }

        const markdownConverter = new showdown.Converter({});
        return replacePairs(markdownConverter.makeHtml(data.aboutText), {
          '%users%': contributorsHtml.join(' '),
          '%total-pictures%': this.decimalPipe.transform(data.about.totalPictures),
          '%total-vehicles%': data.about.totalItems.toString(),
          '%total-size%': this.bytesPipe.transform(data.about.picturesSize * 1024 * 1024, 1).toString(),
          '%total-users%': data.about.totalUsers.toString(),
          '%total-comments%': data.about.totalComments.toString(),
          '%github%':
            '<i class="bi bi-github" aria-hidden="true"></i> ' +
            '<a href="https://github.com/autowp/autowp">https://github.com/autowp/autowp</a>',
          '%developer%': this.userHtml(data.users.get(data.about.developer)),
          '%fr-translator%': this.userHtml(data.users.get(data.about.frTranslator)),
          '%zh-translator%': this.userHtml(data.users.get(data.about.zhTranslator)),
          '%be-translator%': this.userHtml(data.users.get(data.about.beTranslator)),
          '%pt-br-translator%': this.userHtml(data.users.get(data.about.ptBrTranslator)),
        });
      })
    );

  constructor(
    private userService: UserService,
    private router: Router,
    private decimalPipe: DecimalPipe,
    private bytesPipe: BytesPipe,
    private pageEnv: PageEnvService,
    private statGrpc: StatisticsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 136}), 0);
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
      this.router.createUrlTree(['/users', user.identity ? user.identity : 'user' + user.id]).toString()
    );
    a.innerText = user.name;

    return '<i class="bi bi-person-fill" aria-hidden="true"></i> ' + span.appendChild(a).outerHTML;
  }
}
