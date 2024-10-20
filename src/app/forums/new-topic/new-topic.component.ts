import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APICreateTopicRequest, APIForumsTheme, APIGetForumsThemeRequest} from '@grpc/spec.pb';
import {ForumsClient} from '@grpc/spec.pbsc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {InvalidParams} from '@utils/invalid-params.pipe';
import {getForumsThemeTranslation} from '@utils/translations';
import {EMPTY} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {extractFieldViolations, fieldViolations2InvalidParams} from '../../grpc';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-new-topic',
  templateUrl: './new-topic.component.html',
})
export class ForumsNewTopicComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly auth = inject(AuthService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly forums = inject(ForumsClient);
  private readonly grpc = inject(ForumsClient);

  protected readonly form = {
    message: '',
    moderator_attention: false,
    name: '',
    subscription: false,
  };
  protected invalidParams?: InvalidParams;
  protected readonly theme$ = this.route.paramMap.pipe(
    map((params) => params.get('theme_id')),
    distinctUntilChanged(),
    switchMap((themeID) => (themeID ? this.grpc.getTheme(new APIGetForumsThemeRequest({id: themeID})) : EMPTY)),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    shareReplay(1),
  );
  protected readonly user$ = this.auth.getUser$();

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
          message: this.form.message,
          moderatorAttention: this.form.moderator_attention,
          name: this.form.name,
          subscription: this.form.subscription,
          themeId: '' + theme.id,
        }),
      )
      .subscribe({
        error: (response: unknown) => {
          if (response instanceof GrpcStatusEvent && response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldViolations2InvalidParams(fieldViolations);
          } else {
            this.toastService.handleError(response);
          }
        },
        next: (response) => {
          this.router.navigate(['/forums/topic', response.id]);
        },
      });
  }

  protected getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
