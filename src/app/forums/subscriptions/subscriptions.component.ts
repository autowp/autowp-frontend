import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator, APIService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIForumTopic, ForumsService } from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-subscriptions',
  templateUrl: './subscriptions.component.html'
})
@Injectable()
export class ForumsSubscriptionsComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public topics: APIForumTopic[] = [];
  public paginator: APIPaginator;

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private forumService: ForumsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `Forums`,
          pageId: 42
        }),
      0
    );

    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => parseInt(params.get('page'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(page =>
          this.forumService.getTopics({
            fields: 'author,messages,last_message.user',
            subscription: true,
            page
          })
        )
      )
      .subscribe(
        response => {
          this.topics = response.items;
          this.paginator = response.paginator;
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  public unsubscribe(topic: APIForumTopic) {
    this.api
      .request<void>('PUT', 'forum/topic/' + topic.id, {body: {
        subscription: 0
      }})
      .subscribe(
        () => {
          for (let i = this.topics.length - 1; i >= 0; i--) {
            if (this.topics[i].id === topic.id) {
              this.topics.splice(i, 1);
              break;
            }
          }
        },
        response => this.toastService.response(response)
      );
  }
}
