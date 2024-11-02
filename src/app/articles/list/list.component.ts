import {AsyncPipe, DatePipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIUser, ArticlesRequest} from '@grpc/spec.pb';
import {ArticlesClient} from '@grpc/spec.pbsc';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

interface Article {
  author$: Observable<APIUser>;
  date: Date;
  description: string;
  id: string;
  name: string;
  previewUrl: string;
  routerLink: string[];
}

@Component({
  imports: [RouterLink, UserComponent, NgbTooltip, PaginatorComponent, AsyncPipe, DatePipe, TimeAgoPipe],
  selector: 'app-articles-list',
  standalone: true,
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly articlesClient = inject(ArticlesClient);
  private readonly userService = inject(UserService);

  protected readonly articles$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') ?? '', 10) || 1),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.articlesClient.getList(
        new ArticlesRequest({
          limit: '10',
          page: '' + page,
        }),
      ),
    ),
    catchError((response: unknown) => {
      console.error(response);
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      articles: (response.items || []).map((article) => ({
        author$: article.authorId !== '0' ? this.userService.getUser$(article.authorId) : of(null),
        date: article.date?.toDate(),
        description: article.description,
        id: article.id,
        name: article.name,
        previewUrl: article.previewUrl,
        routerLink: ['/articles', article.catname],
      })) as Article[],
      paginator: response.paginator,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 31}), 0);
  }
}
