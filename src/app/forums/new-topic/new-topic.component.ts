import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EMPTY} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError, shareReplay} from 'rxjs/operators';
import {APIForumTheme, ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '../../utils/translations';
import {InvalidParams} from '../../utils/invalid-params.pipe';
import {ForumsClient} from '../../../../generated/spec.pbsc';
import {APICreateTopicRequest} from '../../../../generated/spec.pb';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';

@Component({
  selector: 'app-forums-new-topic',
  templateUrl: './new-topic.component.html',
})
export class ForumsNewTopicComponent implements OnInit {
  public form = {
    name: '',
    message: '',
    moderator_attention: false,
    subscription: false,
  };
  public invalidParams: InvalidParams;
  public theme$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('theme_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((themeID) => this.forumService.getTheme(themeID, {})),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay(1)
  );
  public user$ = this.auth.getUser();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    public auth: AuthService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private forums: ForumsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 45});
    }, 0);
  }

  public submit(theme: APIForumTheme) {
    this.invalidParams = {};

    this.forums
      .createTopic(
        new APICreateTopicRequest({
          themeId: '' + theme.id,
          name: this.form.name,
          message: this.form.message,
          moderatorAttention: this.form.moderator_attention,
          subscription: this.form.subscription,
        })
      )
      .subscribe({
        next: (response) => {
          this.router.navigate(['/forums/topic', response.id]);
        },
        error: (response) => {
          if (response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          } else {
            this.toastService.response(response.statusMessage);
          }
        },
      });
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
