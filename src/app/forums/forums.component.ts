import {Component} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {getForumsThemeDescriptionTranslation, getForumsThemeTranslation} from '@utils/translations';
import {ForumsClient} from '@grpc/spec.pbsc';
import {
  APICommentMessage,
  APIForumsTheme,
  APIForumsThemes,
  APIForumsTopic,
  APIGetForumsThemeRequest,
  APIGetForumsThemesRequest,
  APIGetForumsTopicRequest,
  APIGetForumsTopicsRequest,
  APIUser,
  Pages,
} from '@grpc/spec.pb';
import {UserService} from '@services/user';
import {GrpcStatusEvent} from '@ngx-grpc/common';

interface Theme extends APIForumsTheme.AsObject {
  themes$: Observable<APIForumsThemes>;
  lastTopic$: Observable<APIForumsTopic>;
  lastMessage$: Observable<APICommentMessage>;
  lastMessageAuthor$: Observable<APIUser>;
}

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styles: ['app-forums {display:block}'],
})
export class ForumsComponent {
  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged()
  );

  private readonly themeID$ = this.route.paramMap.pipe(
    map((params) => params.get('theme_id')),
    distinctUntilChanged()
  );

  protected readonly data$: Observable<{themes: Theme[]; theme: APIForumsTheme | null}> = this.themeID$.pipe(
    switchMap((themeID) => {
      if (!themeID) {
        return this.grpc.getThemes(new APIGetForumsThemesRequest({})).pipe(
          map((response) => ({
            theme: null as APIForumsTheme,
            themes: response.items,
          }))
        );
      } else {
        return combineLatest([
          this.grpc.getTheme(new APIGetForumsThemeRequest({id: themeID})),
          this.grpc.getThemes(new APIGetForumsThemesRequest({themeId: themeID})),
        ]).pipe(
          map(([theme, themes]) => ({
            theme,
            themes: themes.items,
          }))
        );
      }
    }),
    map((data) => {
      return {
        theme: data.theme,
        themes: data.themes.map((theme) => {
          const lastTopic$ = this.grpc.getLastTopic(new APIGetForumsThemeRequest({id: theme.id})).pipe(
            catchError((error: unknown) => {
              if (error instanceof GrpcStatusEvent && error.statusCode === 5) {
                return of(null);
              }
              return throwError(() => error);
            }),
            shareReplay(1)
          );
          const lastMessage$ = lastTopic$.pipe(
            switchMap((topic) => {
              if (!topic) {
                return of(null);
              }

              return this.grpc.getLastMessage(new APIGetForumsTopicRequest({id: topic.id}));
            }),
            catchError((error: unknown) => {
              if (error instanceof GrpcStatusEvent && error.statusCode === 5) {
                return of(null);
              }
              return throwError(() => error);
            }),
            shareReplay(1)
          );
          const lastMessageAuthor$ = lastMessage$.pipe(
            switchMap((msg) => {
              if (!msg) {
                return of(null);
              }
              return this.userService.getUser2$(msg.userId);
            })
          );
          return {
            ...theme.toObject(),
            themes$: this.grpc.getThemes(
              new APIGetForumsThemesRequest({
                themeId: theme.id,
              })
            ),
            lastTopic$,
            lastMessage$,
            lastMessageAuthor$,
          };
        }),
      };
    }),
    tap((data) => {
      if (data.theme) {
        this.pageEnv.set({
          title: getForumsThemeTranslation(data.theme.name),
          pageId: 43,
        });
      } else {
        this.pageEnv.set({pageId: 42});
      }
    }),
    shareReplay(1)
  );

  private readonly reloadTopics$ = new BehaviorSubject<boolean>(false);

  protected readonly topics$: Observable<{items: APIForumsTopic[]; paginator: Pages}> = combineLatest([
    this.themeID$,
    this.page$,
    this.reloadTopics$,
  ]).pipe(switchMap(([themeId, page]) => this.grpc.getTopics(new APIGetForumsTopicsRequest({themeId, page}))));

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private grpc: ForumsClient,
    private userService: UserService
  ) {}

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }

  protected getForumsThemeDescriptionTranslation(id: string): string {
    return getForumsThemeDescriptionTranslation(id);
  }

  protected reload() {
    this.reloadTopics$.next(true);
  }
}
