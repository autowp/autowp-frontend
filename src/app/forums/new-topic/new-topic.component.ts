import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EMPTY} from 'rxjs';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, switchMap, map, catchError, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {getForumsThemeTranslation} from '@utils/translations';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {ForumsClient} from '@grpc/spec.pbsc';
import {APICreateTopicRequest, APIForumsTheme, APIGetForumsThemeRequest} from '@grpc/spec.pb';
import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {GrpcStatusEvent} from '@ngx-grpc/common';

@Component({
  selector: 'app-forums-new-topic',
  templateUrl: './new-topic.component.html',
})
export class ForumsNewTopicComponent implements OnInit {
  protected readonly form = {
    name: '',
    message: '',
    moderator_attention: false,
    subscription: false,
  };
  protected invalidParams: InvalidParams;
  protected readonly theme$ = this.route.paramMap.pipe(
    map((params) => params.get('theme_id')),
    distinctUntilChanged(),
    switchMap((themeID) => this.grpc.getTheme(new APIGetForumsThemeRequest({id: themeID}))),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay(1)
  );
  protected readonly user$ = this.auth.getUser$();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    protected readonly auth: AuthService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly forums: ForumsClient,
    private readonly grpc: ForumsClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 45});
    }, 0);
  }

  protected submit(theme: APIForumsTheme) {
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
        error: (response: unknown) => {
          if (response instanceof GrpcStatusEvent && response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          } else {
            this.toastService.handleError(response);
          }
        },
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
