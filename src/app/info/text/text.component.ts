import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { UserService, APIUser } from '../../services/user';
import { Subscription, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

const JsDiff = require('diff');

export interface APIInfoText {
  current: {
    user_id: number;
    user?: APIUser;
    revision: number;
    text: string;
  };
  prev: {
    user_id: number;
    user?: APIUser;
    revision: number;
    text: string;
  };
  next: {
    user_id: number;
    user?: APIUser;
    revision: number;
  };
}

@Component({
  selector: 'app-info-text',
  templateUrl: './text.component.html'
})
@Injectable()
export class InfoTextComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public prev: {
    user_id: number;
    user?: APIUser;
    revision: number;
    text: string;
  };
  public current: {
    user_id: number;
    user?: APIUser;
    revision: number;
    text: string;
  };
  public next: {
    user_id: number;
    user?: APIUser;
    revision: number;
  };
  public diff: any[] = [];

  constructor(
    private api: APIService,
    private userService: UserService,
    private route: ActivatedRoute,
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
          name: 'page/197/name',
          pageId: 197
        }),
      0
    );

    this.routeSub = combineLatest([
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('id'), 10))
      ),
      this.route.queryParamMap.pipe(
        map(params => parseInt(params.get('revision'), 10))
      ),
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(([id, revision]) =>
          this.api.request<APIInfoText>('GET', 'text/' + id, {
            params: {revision: revision.toString()}
          })
        )
      )
      .subscribe(
        response => {
          this.current = response.current;
          this.prev = response.prev;
          this.next = response.next;

          if (this.current.user_id) {
            this.userService.getUser(this.current.user_id, {}).subscribe(
              user => {
                this.current.user = user;
              },
              subresponse => this.toastService.response(subresponse)
            );
          }

          if (this.prev.user_id) {
            this.userService.getUser(this.prev.user_id, {}).subscribe(
              user => {
                this.prev.user = user;
              },
              subresponse => this.toastService.response(subresponse)
            );
          }

          this.diff = JsDiff.diffChars(
            this.prev.text ? this.prev.text : '',
            this.current.text
          );
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
