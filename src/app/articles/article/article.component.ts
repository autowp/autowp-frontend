import {Router, ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {EMPTY} from 'rxjs';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {ArticlesClient} from '../../../../generated/spec.pbsc';
import {ArticleByCatnameRequest} from '../../../../generated/spec.pb';
import {GrpcStatusEvent} from '@ngx-grpc/common';

@Component({
  selector: 'app-articles-article',
  templateUrl: './article.component.html',
})
export class ArticlesArticleComponent {
  public article$ = this.route.paramMap.pipe(
    map((params) => params.get('catname')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((catname) => this.articlesClient.getItemByCatname(new ArticleByCatnameRequest({catname}))),
    map((article) => {
      this.pageEnv.set({
        title: article.name,
        pageId: 32,
      });

      return article;
    }),
    catchError((response: GrpcStatusEvent) => {
      if (response.statusCode === 5) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
      } else {
        this.toastService.grpcErrorResponse(response);
      }
      return EMPTY;
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articlesClient: ArticlesClient,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
