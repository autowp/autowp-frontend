import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy, Injectable, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { APIArticle, ArticleService } from '../article.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-articles-article',
  templateUrl: './article.component.html'
})
@Injectable()
export class ArticlesArticleComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public article: APIArticle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {

    this.routeSub = this.route.params
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params =>
          this.articleService.getArticles({
            catname: params.catname,
            limit: 1,
            fields: 'html'
          })
        )
      )
      .subscribe(
        response => {
          if (response.items.length <= 0) {
            this.router.navigate(['/error-404']);
            return;
          }

          this.article = response.items[0];

          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: this.article.name,
            pageId: 32
          });
        },
        response => {
          if (response.status === 404) {
            this.router.navigate(['/error-404']);
          } else {
            this.toastService.response(response);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
