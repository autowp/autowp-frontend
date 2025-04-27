import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AsyncPipe],
  selector: 'app-forums-move-topic',
  templateUrl: './move-topic.component.html',
})
export class ForumsMoveTopicComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #grpc = inject(ForumsClient);

  protected readonly themes$: Observable<APIForumsTheme[]> = this.#grpc
    .getThemes(new APIGetForumsThemesRequest({}))
    .pipe(
      catchError((response: unknown) => {
        this.#toastService.handleError(response);
        return EMPTY;
      }),
      map((response) => (response.items ? response.items : [])),
    );

  protected readonly topic$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('topic_id')),
    distinctUntilChanged(),
    switchMap((topicID) => (topicID ? this.#grpc.getTopic(new APIGetForumsTopicRequest({id: topicID})) : of(null))),
    catchError(() => {
      this.#router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly theme$ = this.topic$.pipe(
    switchMap((topic) =>
      topic?.themeId ? this.#grpc.getTheme(new APIGetForumsThemeRequest({id: topic.themeId})) : of(null),
    ),
  );

  ngOnInit(): void {
    this.#pageEnv.set({pageId: 83});
  }

  protected selectTheme(topic: APIForumsTopic, theme: APIForumsTheme) {
    this.#grpc
      .moveTopic(
        new APIMoveTopicRequest({
          id: topic.id,
          themeId: theme.id,
        }),
      )
      .subscribe({
        error: (response: unknown) => this.#toastService.handleError(response),
        next: () => {
          this.#router.navigate(['/forums/topic', topic.id]);
        },
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
