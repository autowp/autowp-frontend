import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  APIForumsTheme,
  APIForumsTopic,
  APIGetForumsThemeRequest,
  APIGetForumsThemesRequest,
  APIGetForumsTopicRequest,
  APIMoveTopicRequest,
} from '@grpc/spec.pb';
import {ForumsClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {getForumsThemeTranslation} from '@utils/translations';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-move-topic',
  templateUrl: './move-topic.component.html',
})
export class ForumsMoveTopicComponent implements OnInit {
  protected readonly themes$: Observable<APIForumsTheme[]> = this.grpc
    .getThemes(new APIGetForumsThemesRequest({}))
    .pipe(
      catchError((response: unknown) => {
        this.toastService.handleError(response);
        return EMPTY;
      }),
      map((response) => (response.items ? response.items : [])),
    );

  protected readonly topic$ = this.route.queryParamMap.pipe(
    map((params) => params.get('topic_id')),
    distinctUntilChanged(),
    switchMap((topicID) => (topicID ? this.grpc.getTopic(new APIGetForumsTopicRequest({id: topicID})) : of(null))),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay(1),
  );

  protected readonly theme$ = this.topic$.pipe(
    switchMap((topic) =>
      topic?.themeId ? this.grpc.getTheme(new APIGetForumsThemeRequest({id: topic.themeId})) : of(null),
    ),
  );

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly grpc: ForumsClient,
  ) {}

  ngOnInit(): void {
    this.pageEnv.set({pageId: 83});
  }

  protected selectTheme(topic: APIForumsTopic, theme: APIForumsTheme) {
    this.grpc
      .moveTopic(
        new APIMoveTopicRequest({
          id: topic.id,
          themeId: theme.id,
        }),
      )
      .subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
        next: () => {
          this.router.navigate(['/forums/topic', topic.id]);
        },
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
