import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIPaginator } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIArticle, ArticleService } from '../article.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private querySub: Subscription;
  public articles: APIArticle[];
  public paginator: APIPaginator;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/31/name',
          pageId: 31
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => parseInt(params.get('page'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(page =>
          this.articleService.getArticles({
            page,
            limit: 10,
            fields: 'description,author'
          })
        )
      )
      .subscribe(
        response => {
          this.articles = response.items;
          this.paginator = response.paginator;
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

}
