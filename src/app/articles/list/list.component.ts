import {Component} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {ArticlesClient} from '@grpc/spec.pbsc';
import {ArticlesRequest} from '@grpc/spec.pb';
import {APIUser, UserService} from '../../services/user';

interface Article {
  routerLink: string[];
  previewUrl: string;
  name: string;
  description: string;
  date: Date;
  author$: Observable<APIUser>;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public articles$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10) || 1),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.articlesClient.getList(
        new ArticlesRequest({
          page: '' + page,
          limit: '10',
        })
      )
    ),
    catchError((response) => {
      console.log(response);
      this.toastService.grpcErrorResponse(response);
      return EMPTY;
    }),
    map((response) => ({
      paginator: response.paginator,
      articles: response.items.map((article) => ({
        routerLink: ['/articles', article.catname],
        previewUrl: article.previewUrl,
        name: article.name,
        description: article.description,
        date: article.date.toDate(),
        author$: article.authorId !== '0' ? this.userService.getUser(+article.authorId, {}) : of(null as APIUser),
      })) as Article[],
    }))
  );

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private articlesClient: ArticlesClient,
    private userService: UserService
  ) {
    setTimeout(() => this.pageEnv.set({pageId: 31}), 0);
  }
}
