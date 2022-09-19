import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {EMPTY} from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import { ArticleService } from '../article.service';
import {ToastsService} from '../../toasts/toasts.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-articles-article',
  templateUrl: './article.component.html'
})
export class ArticlesArticleComponent {
  public article$ = this.route.paramMap.pipe(
    map(params => params.get('catname')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap(catname => this.articleService.getArticles({
      catname,
      limit: 1,
      fields: 'html'
    })),
    map(response => {
      if (response.items.length <= 0) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return;
      }

      const article = response.items[0];

      this.pageEnv.set({
        nameTranslated: article.name,
        pageId: 32
      });

      return article;
    }),
    catchError((response: HttpErrorResponse) => {
      if (response.status === 404) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
      } else {
        this.toastService.response(response);
      }
      return EMPTY;
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
