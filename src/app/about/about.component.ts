import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import * as showdown from 'showdown';
import * as escapeRegExp from 'lodash.escaperegexp';
import { UserService, APIUser } from '../services/user';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BytesPipe } from 'ngx-pipes';
import { PageEnvService } from '../services/page-env.service';
import { combineLatest, Subscription } from 'rxjs';
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

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
@Injectable()
export class AboutComponent implements OnInit, OnDestroy {
  public html = '';
  private sub: Subscription;

  constructor(
    private api: APIService,
    private translate: TranslateService,
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
          name: 'page/136/name',
          pageId: 136
        }),
      0
    );

    this.sub = combineLatest([
      this.api.request<APIAbout>('GET', 'about'),
      this.translate.get('about/text')
    ])
      .pipe(
        switchMap(
          ([about, translation]) => {
            const ids: number[] = about.contributors;
            ids.push(about.developer);
            ids.push(about.fr_translator);
            ids.push(about.zh_translator);
            ids.push(about.be_translator);
            ids.push(about.pt_br_translator);

            return this.userService.getUserMap(ids).pipe(
              map(users => ({
                users,
                translation,
                about
              }))
            );
          }
        )
      )
      .subscribe(data => {
        const contributorsHtml: string[] = [];
        for (const id of data.about.contributors) {
          contributorsHtml.push(this.userHtml(data.users.get(id)));
        }

        const markdownConverter = new showdown.Converter({});
        this.html = replacePairs(markdownConverter.makeHtml(data.translation), {
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
