import { Component} from '@angular/core';
import {EMPTY} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import { ArticleService } from '../article.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public articles$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap(page => this.articleService.getArticles({
      page,
      limit: 10,
      fields: 'description,author'
    })),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({pageId: 31}),
      0
    );
  }

}
