import { Component, OnInit} from '@angular/core';
import { APIService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import {EMPTY} from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {APIForumTopic, ForumsService} from '../forums.service';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class ForumsSubscriptionsComponent implements OnInit {

  public data$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(page => this.forumService.getTopics({
      fields: 'author,messages,last_message.user',
      subscription: true,
      page
    })),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

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
        this.pageEnv.set({pageId: 42}),
      0
    );
  }

  public unsubscribe(topic: APIForumTopic, topics: APIForumTopic[]) {
    this.api
      .request<void>('PUT', 'forum/topic/' + topic.id, {body: {
        subscription: 0
      }})
      .subscribe({
        next: () => {
          for (let i = topics.length - 1; i >= 0; i--) {
            if (topics[i].id === topic.id) {
              topics.splice(i, 1);
              break;
            }
          }
        },
        error: response => this.toastService.response(response)
      });
  }
}
