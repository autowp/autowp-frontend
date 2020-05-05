import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../../services/api.service';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { AuthService } from '../../services/auth.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
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
    private api: APIService,
    private forumService: ForumsService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    public auth: AuthService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.limit = this.forumService.getLimit();

    this.paramsSub = combineLatest([
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('topic_id'), 10))
      ),
      this.route.queryParamMap.pipe(
        map(params => parseInt(params.get('page'), 10))
      ),
      this.auth.getUser()
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(10),
        switchMap(([topicID, page, user]) => {
          this.user = user;
          this.page = page;
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
    this.api
      .request<void>('PUT', 'forum/topic/' + this.topic.id, {body: {
        subscription: 1
      }})
      .subscribe(
        () => {
          this.topic.subscription = true;
        },
        response => this.toastService.response(response)
      );
  }

  public unsubscribe() {
    this.api
      .request<void>('PUT', 'forum/topic/' + this.topic.id, {body: {
        subscription: 0
      }})
      .subscribe(
        () => {
          this.topic.subscription = false;
        },
        response => this.toastService.response(response)
      );
  }
}
