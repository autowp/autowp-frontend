import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APIUser} from '@grpc/spec.pb';
import {APIPicture, PictureService} from '@services/picture';
import {UserService} from '@services/user';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import URLParse from 'url-parse';

import {UserComponent} from '../../user/user/user.component';

interface CommentTextElement {
  picture?: APIPicture;
  text?: string;
  type: 'a' | 'picture' | 'text' | 'user';
  url?: string;
  user?: APIUser;
}

interface CommentTextLine {
  elements: CommentTextElement[];
}

@Component({
  imports: [UserComponent, RouterLink, AsyncPipe],
  selector: 'app-user-text',
  templateUrl: './user-text.component.html',
})
export class UserTextComponent {
  private readonly userService = inject(UserService);
  private readonly pictureService = inject(PictureService);

  @Input() set text(text: string) {
    this.text$.next(text);
  }
  private readonly text$ = new BehaviorSubject<null | string>(null);

  private readonly parseUrlHosts = [
    'www.autowp.ru',
    'en.autowp.ru',
    'ru.autowp.ru',
    'autowp.ru',
    'fr.wheelsage.org',
    'en.wheelsage.org',
    'zh.wheelsage.org',
    'be.wheelsage.org',
    'br.wheelsage.org',
    'uk.wheelsage.org',
    'it.wheelsage.org',
    'wheelsage.org',
  ];

  protected readonly textPrepared$ = this.text$.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((text) => this.prepareText$(text ? text : '')),
  );

  private prepareText$(text: string): Observable<CommentTextLine[]> {
    const lines = text.split(/\r?\n/);
    const result: Observable<CommentTextLine>[] = [];

    lines.forEach((line) => {
      result.push(
        this.prepareLine$(line).pipe(
          map((value) => ({
            elements: value,
          })),
        ),
      );
    });

    return combineLatest(result);
  }

  private prepareLine$(line: string): Observable<CommentTextElement[]> {
    const out: Observable<CommentTextElement>[] = [];

    const re = new RegExp(/(https?:\/\/[\w:.,/?&=~+%#'!|()-]{3,})|(www.[\w.,/?&=~+%#'!|()-]{3,})/i, 'i');

    let res: null | RegExpExecArray = null;
    let umatch: string;
    let url;

    while (line && (res = re.exec(line))) {
      if (res[1]) {
        umatch = res[1];
        url = umatch;
      } else {
        umatch = res[2];
        url = 'https://' + umatch;
      }

      const linkPos = line.indexOf(umatch);
      const matchLength = umatch.length;
      if (linkPos < 0) {
        throw new Error('Error during parse urls');
      }

      out.push(
        of({
          text: line.substring(0, linkPos),
          type: 'text',
        }),
      );

      out.push(this.processHref$(url));

      line = line.substring(linkPos + matchLength);
    }

    if (line.length > 0) {
      out.push(
        of({
          text: line,
          type: 'text',
        }),
      );
    }

    return out.length ? combineLatest(out) : of([]);
  }

  private processHref$(url: string): Observable<CommentTextElement> {
    const uri = URLParse(url);

    const hostAllowed = this.parseUrlHosts.indexOf(uri.host.toLowerCase()) >= 0;

    if (hostAllowed) {
      return this.tryUserLink$(uri).pipe(
        switchMap((element) => {
          if (!element) {
            return this.tryPictureLink$(uri);
          }

          return of(element);
        }),
        map((element) =>
          element
            ? element
            : {
                type: 'a',
                url,
              },
        ),
      );
    }

    return of({
      type: 'a',
      url,
    });
  }

  private tryUserLink$(uri: URLParse<string>): Observable<CommentTextElement | null> {
    const re = new RegExp(/^\/users\/([^/]+)$/i, 'i');
    const matches = re.exec(uri.pathname);
    if (!matches) {
      return of(null);
    }

    const userIdentity: null | string = matches[1];

    if (userIdentity) {
      return this.userService.getByIdentity$(userIdentity, undefined).pipe(
        catchError(() => of(null)),
        map((user) =>
          user
            ? {
                type: 'user',
                user,
              }
            : null,
        ),
      );
    }

    return of(null);
  }

  private tryPictureLink$(uri: URLParse<string>): Observable<CommentTextElement | null> {
    const re = new RegExp(/\/pictures?\/([^/]+)$/i, 'i');
    const matches = re.exec(uri.pathname);

    if (!matches) {
      return of(null);
    }

    let pictureId: null | number = null;
    let pictureIdentity: null | string = matches[1];

    const re2 = new RegExp(/^(\d+)$/i, 'i');
    const match = re2.exec(pictureIdentity);
    if (match) {
      pictureIdentity = null;
      pictureId = parseInt(matches[1] || '', 10);
    }

    const fields = 'owner,thumb,votes,views,comments_count,name_html,name_text';

    if (pictureId) {
      return this.pictureService.getPicture$(pictureId, {fields}).pipe(
        catchError(() => of(null)),
        map((picture) =>
          picture
            ? {
                picture,
                type: 'picture',
              }
            : null,
        ),
      );
    }

    if (pictureIdentity) {
      return this.pictureService.getPictures$({fields, identity: pictureIdentity}).pipe(
        catchError(() => of(null)),
        map((pictures) =>
          pictures && pictures.pictures.length > 0
            ? {
                picture: pictures.pictures[0],
                type: 'picture',
              }
            : null,
        ),
      );
    }

    return of(null);
  }
}
