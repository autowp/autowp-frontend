import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PageEnvService } from '../../services/page-env.service';
import { APIUser } from '../../services/user';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIForumTheme, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-new-topic',
  templateUrl: './new-topic.component.html'
})
@Injectable()
export class ForumsNewTopicComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public form = {
    name: '',
    text: '',
    moderator_attention: false,
    subscription: false
  };
  public invalidParams: any;
  public theme: APIForumTheme;
  public user: APIUser;

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
        name: 'page/45/name',
        pageId: 45
      });
    }, 0);

    this.routeSub = combineLatest([this.route.params, this.auth.getUser()])
      .pipe(
        map(data => ({ params: data[0], user: data[1] })),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(data => this.forumService.getTheme(data.params.theme_id, {}).pipe(
          map(theme => ({
            user: data.user,
            theme: theme
          }))
        ))
      )
      .subscribe(
        data => {
          this.theme = data.theme;
          this.user = data.user;
        },
        () => {
          this.router.navigate(['/error-404']);
        }
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public submit() {
    this.invalidParams = {};

    this.forumService
      .postTopic({
        theme_id: this.theme.id,
        name: this.form.name,
        text: this.form.text,
        moderator_attention: this.form.moderator_attention,
        subscription: this.form.subscription
      })
      .subscribe(
        response => {
          const location = response.headers.get('Location');

          this.forumService.getTopicByLocation(location, {}).subscribe(
            topic => {
              this.router.navigate(['/forums/topic', topic.id]);
            },
            subresponse => this.toastService.response(subresponse)
          );
        },
        response => {
          if (response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else {
            this.toastService.response(response);
          }
        }
      );
  }
}
