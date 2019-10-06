import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIPaginator } from '../../services/api.service';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs/operators';
import { APIUser } from '../../services/user';
import { APIForumTopic, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-topic',
  templateUrl: './topic.component.html'
})
@Injectable()
export class ForumsTopicComponent implements OnInit, OnDestroy {
  private paramsSub: Subscription;
  public topic: APIForumTopic;
  public paginator: APIPaginator;
  public limit: number;
  public user: APIUser;
  public page: number;

  constructor(
    private http: HttpClient,
    private forumService: ForumsService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    public auth: AuthService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.limit = this.forumService.getLimit();

    this.paramsSub = combineLatest(
      [
        this.route.params,
        this.route.queryParams,
        this.auth.getUser()
      ],
      (route, query, user) => ({ route, query, user })
    )
      .pipe(
        switchMap(data => {
          this.user = data.user;
          const topicID = parseInt(data.route.topic_id, 10);
          this.page = parseInt(data.query.page, 10);
          return this.forumService.getTopic(topicID, {
            fields: 'author,theme,subscription',
            page: this.page
          });
        })
      )
      .subscribe(topic => {
        this.topic = topic;

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: this.topic.name,
          pageId: 44
        });
      });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  public subscribe() {
    this.http
      .put<void>('/api/forum/topic/' + this.topic.id, {
        subscription: 1
      })
      .subscribe(
        response => {
          this.topic.subscription = true;
        },
        response => this.toastService.response(response)
      );
  }

  public unsubscribe() {
    this.http
      .put<void>('/api/forum/topic/' + this.topic.id, {
        subscription: 0
      })
      .subscribe(
        response => {
          this.topic.subscription = false;
        },
        response => this.toastService.response(response)
      );
  }
}
