import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIForumsTopic, APIGetForumsTopicsRequest, Pages} from '@grpc/spec.pb';
import {ForumsClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-subscriptions',
  templateUrl: './subscriptions.component.html',
})
export class ForumsSubscriptionsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly grpc = inject(ForumsClient);

  private readonly reload$ = new BehaviorSubject<void>(void 0);

  protected readonly data$: Observable<{items?: APIForumsTopic[]; paginator?: Pages}> = combineLatest([
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') || '', 10)),
      distinctUntilChanged(),
    ),
    this.reload$,
  ]).pipe(
    switchMap(([page]) => this.grpc.getTopics(new APIGetForumsTopicsRequest({page, subscription: true}))),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 42}), 0);
  }

  protected reload() {
    this.reload$.next();
  }
}
