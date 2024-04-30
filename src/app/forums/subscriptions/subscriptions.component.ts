import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIForumsTopic, APIGetForumsTopicsRequest, Pages} from '@grpc/spec.pb';
import {ForumsClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY, Observable, combineLatest} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-forums-subscriptions',
  templateUrl: './subscriptions.component.html',
})
export class ForumsSubscriptionsComponent implements OnInit {
  private readonly reload$ = new BehaviorSubject<boolean>(false);

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

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly grpc: ForumsClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 42}), 0);
  }

  protected reload() {
    this.reload$.next(true);
  }
}
