import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EMPTY} from 'rxjs';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {APIForumTheme, APIForumTopic, ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '../../utils/translations';
import {ForumsClient} from '../../../../generated/spec.pbsc';
import {APIMoveTopicRequest} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-forums-move-topic',
  templateUrl: './move-topic.component.html',
})
export class ForumsMoveTopicComponent implements OnInit {
  public themes$ = this.forumService.getThemes({}).pipe(
    catchError((response) => {
      this.toastService.response(response);
      return EMPTY;
    }),
    map((response) => response.items)
  );

  public topic$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('topic_id'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((topicID) => this.forumService.getTopic(topicID, {})),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: ForumsClient
  ) {}

  ngOnInit(): void {
    this.pageEnv.set({pageId: 83});
  }

  public selectTheme(topic: APIForumTopic, theme: APIForumTheme) {
    this.grpc
      .moveTopic(
        new APIMoveTopicRequest({
          id: '' + topic.id,
          themeId: '' + theme.id,
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/forums/topic', topic.id]);
        },
        error: (response) => this.toastService.grpcErrorResponse(response),
      });
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
