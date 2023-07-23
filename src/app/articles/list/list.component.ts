import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticlesRequest} from '@grpc/spec.pb';
import {ArticlesClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIUser, UserService} from '@services/user';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

interface Article {
  author$: Observable<APIUser>;
  date: Date;
  description: string;
  name: string;
  previewUrl: string;
  routerLink: string[];
}

@Component({
  selector: 'app-articles-list',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent {
  protected readonly articles$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10) || 1),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.articlesClient.getList(
        new ArticlesRequest({
          limit: '10',
          page: '' + page,
        })
      )
    ),
    catchError((response: unknown) => {
      console.log(response);
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      articles: response.items.map((article) => ({
        author$: article.authorId !== '0' ? this.userService.getUser$(+article.authorId, {}) : of(null as APIUser),
        date: article.date.toDate(),
        description: article.description,
        name: article.name,
        previewUrl: article.previewUrl,
        routerLink: ['/articles', article.catname],
      })) as Article[],
      paginator: response.paginator,
    }))
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly articlesClient: ArticlesClient,
    private readonly userService: UserService
  ) {
    setTimeout(() => this.pageEnv.set({pageId: 31}), 0);
  }
}
