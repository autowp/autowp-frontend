import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleByCatnameRequest} from '@grpc/spec.pb';
import {ArticlesClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-articles-article',
  templateUrl: './article.component.html',
})
export class ArticlesArticleComponent {
  protected readonly article$ = this.route.paramMap.pipe(
    map((params) => params.get('catname')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((catname) => this.articlesClient.getItemByCatname(new ArticleByCatnameRequest({catname}))),
    map((article) => {
      this.pageEnv.set({
        pageId: 32,
        title: article.name,
      });

      return article;
    }),
    catchError((response: unknown) => {
      if (response instanceof GrpcStatusEvent && response.statusCode === 5) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
      } else {
        this.toastService.handleError(response);
      }
      return EMPTY;
    })
  );

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articlesClient: ArticlesClient,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}
}
