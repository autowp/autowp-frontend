import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {APIUser, UserService} from '../../services/user';
import {APIPicture, APIPictureGetResponse, PictureService} from '../../services/picture';
import {BehaviorSubject, combineLatest, Observable, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import * as URLParse from 'url-parse';

interface CommentTextElement {
  type: 'text'|'user'|'a'|'picture';
  text?: string;
  url?: string;
  user?: APIUser;
  picture?: APIPicture;
}

interface CommentTextLine {
  elements: CommentTextElement[];
}

@Component({
  selector: 'app-user-text',
  templateUrl: './user-text.component.html'
})
@Injectable()
export class UserTextComponent implements OnChanges, OnInit, OnDestroy {
  @Input() text: string;
  public textPrepared: CommentTextLine[];

  private parseUrlHosts = [
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
    'wheelsage.org',
  ];

  private text$ = new BehaviorSubject<string>('');
  private sub: Subscription;

  constructor(
    private userService: UserService,
    private pictureService: PictureService
  ) {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.text$.pipe(
      distinctUntilChanged(),
      debounceTime(10),
      switchMap(text => this.prepareText(text))
    ).subscribe(text => this.textPrepared = text);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.text$.next(this.text);
  }

  private prepareText(text: string): Observable<CommentTextLine[]> {
    const lines = text.split(/\r?\n/);
    const result: Observable<CommentTextLine>[] = [];

    lines.map(line => {
      result.push(this.prepareLine(line).pipe(
        map(value => ({
          elements: value
        }))
      ));
    });

    return combineLatest(result);
  }

  private prepareLine(line: string): Observable<CommentTextElement[]> {
    const out: Observable<CommentTextElement>[] = [];

    const re = new RegExp(/(https?:\/\/[\w:.,\/?&_=~+%#'!|()-]{3,})|(www.[\w.,\/?&_=~+%#'!|()-]{3,})/isu, 'i');

    let res = null;
    let umatch: string;
    let url;

    // tslint:disable-next-line:no-conditional-assignment
    while (line && (res = re.exec(line))) {
      if (res[1]) {
        umatch = res[1];
        url = umatch;
      } else {
        umatch = res[2];
        url = 'http://' + umatch;
      }

      const linkPos = line.indexOf(umatch);
      const matchLength = umatch.length;
      if (linkPos < 0) {
        throw new Error('Error during parse urls');
      }

      out.push(of({
        type: 'text',
        text: line.substring(0, linkPos)
      }));

      out.push(this.processHref(url));

      line = line.substring(linkPos + matchLength);
    }

    if (line.length > 0) {
      out.push(of({
        type: 'text',
        text: line
      }));
    }

    return combineLatest(out);
  }

  private processHref(url: string): Observable<CommentTextElement>
  {
    const uri = URLParse(url);

    const hostAllowed = this.parseUrlHosts.indexOf(uri.host.toLowerCase()) >= 0;

    if (hostAllowed) {
      return this.tryUserLink(uri).pipe(
        switchMap(element => {
          if (! element) {
            return this.tryPictureLink(uri);
          }

          return of(element);
        }),
        map(element => element ? element : {
          type: 'a',
          url
        })
      );
    }

    return of({
      type: 'a',
      url
    });
  }

  private tryUserLink(uri: URLParse): Observable<CommentTextElement|null>
  {
    const re = new RegExp(/^\/users\/([^\/]+)$/isu, 'i');
    const matches = re.exec(uri.pathname);
    if (! matches) {
      return of(null);
    }

    let userId       = null;
    let userIdentity = matches[1];

    const re2 = new RegExp(/^user([0-9]+)$/isu, 'i');
    const match = re2.exec(userIdentity);
    if (match) {
      userIdentity = null;
      userId       = parseInt(matches[1], 10);
    }

    if (userId) {
      return this.userService.getUser(userId, {}).pipe(
        catchError(() => of(null)),
        map(user => user ? {
          type: 'user',
          user
        } : null)
      );
    }

    if (userIdentity) {
      return this.userService.getByIdentity(userIdentity, {}).pipe(
        catchError(() => of(null)),
        map(user => user ? {
          type: 'user',
          user
        } : null)
      );
    }

    return of(null);
  }

  private tryPictureLink(uri: URLParse): Observable<CommentTextElement|null> {
    const re = new RegExp(/\/pictures?\/([^\/]+)$/isu, 'i');
    const matches = re.exec(uri.pathname);

    if (! matches) {
      return of(null);
    }

    let pictureId       = null;
    let pictureIdentity = matches[1];

    const re2 = new RegExp(/^([0-9]+)$/isu, 'i');
    const match = re2.exec(pictureIdentity);
    if (match) {
      pictureIdentity = null;
      pictureId       = parseInt(matches[1], 10);
    }

    const fields = 'owner,thumb,votes,views,comments_count,name_html,name_text';

    if (pictureId) {
      return this.pictureService.getPicture(pictureId, {fields}).pipe(
        catchError(() => of(null)),
        map(picture => picture ? {
          type: 'picture',
          picture
        } : null)
      );
    }

    if (pictureIdentity) {
      return this.pictureService.getPictures({identity: pictureIdentity, fields}).pipe(
        catchError(() => of(null as APIPictureGetResponse)),
        map(pictures => pictures && pictures.pictures.length > 0 ? {
          type: 'picture',
          picture: pictures.pictures[0]
        } : null)
      );
    }

    return of(null);
  }
}
