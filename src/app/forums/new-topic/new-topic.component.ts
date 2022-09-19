import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {EMPTY} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError, shareReplay} from 'rxjs/operators';
import { APIForumTheme, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';
import { getForumsThemeTranslation } from '../../utils/translations';
import {InvalidParams} from '../../utils/invalid-params.pipe';

@Component({
  selector: 'app-forums-new-topic',
  templateUrl: './new-topic.component.html'
})
export class ForumsNewTopicComponent implements OnInit {
  public form = {
    name: '',
    text: '',
    moderator_attention: false,
    subscription: false
  };
  public invalidParams: InvalidParams;
  public theme$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('theme_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(themeID => this.forumService.getTheme(themeID, {})),
    catchError(() => {
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
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
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        pageId: 45
      });
    }, 0);
  }

  public submit(theme: APIForumTheme) {
    this.invalidParams = {};

    this.forumService.postTopic({
      theme_id: theme.id,
      name: this.form.name,
      text: this.form.text,
      moderator_attention: this.form.moderator_attention,
      subscription: this.form.subscription
    }).subscribe({
      next: response => {
        const location = response.headers.get('Location');

        this.forumService.getTopicByLocation(location, {}).subscribe({
          next: topic => {
            this.router.navigate(['/forums/topic', topic.id]);
          },
          error: subresponse => this.toastService.response(subresponse)
        });
      },
      error: response => {
        if (response.status === 400) {
          this.invalidParams = response.error.invalid_params;
        } else {
          this.toastService.response(response);
        }
      }
    });
  }

  public getForumsThemeTranslation(id: string): string {
    return getForumsThemeTranslation(id);
  }
}
