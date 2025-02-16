import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ArticleByCatnameRequest} from '@grpc/spec.pb';
import {ArticlesClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-articles-article',
  templateUrl: './article.component.html',
})
export class ArticlesArticleComponent {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #articlesClient = inject(ArticlesClient);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);

  protected readonly article$ = this.#route.paramMap.pipe(
    map((params) => params.get('catname')),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((catname) => {
      if (!catname) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(catname);
    }),
    switchMap((catname) => this.#articlesClient.getItemByCatname(new ArticleByCatnameRequest({catname}))),
    map((article) => {
      this.#pageEnv.set({
        pageId: 32,
        title: article.name,
      });

      return article;
    }),
    catchError((response: unknown) => {
      if (response instanceof GrpcStatusEvent && response.statusCode === 5) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
      } else {
        this.#toastService.handleError(response);
      }
      return EMPTY;
    }),
  );
}
