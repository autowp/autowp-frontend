import { Component, OnInit} from '@angular/core';
import { UserService, APIUser } from '../../services/user';
import {combineLatest, EMPTY, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

const JsDiff = require('diff');

interface Diff {
  removed: boolean;
  added: boolean;
  value: string;
}

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
export class InfoTextComponent implements OnInit {
  private id$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private revision$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('revision'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  public data$ = combineLatest([this.id$, this.revision$]).pipe(
    switchMap(([id, revision]) =>
      this.api.request<APIInfoText>('GET', 'text/' + id, {
        params: {revision: revision.toString()}
      })
    ),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    }),
    map(response => {
      return {
        diff: JsDiff.diffChars(
          response.prev.text ? response.prev.text : '',
          response.current.text
        ) as Diff[],
        current: {
          user$: response.current.user_id ? this.userService.getUser(response.current.user_id, {}) : of(null),
          revision: response.current.revision,
          text: response.current.text
        },
        prev: {
          user$: response.prev.user_id ? this.userService.getUser(response.prev.user_id, {}) : of(null),
          revision: response.prev.revision,
          text: response.prev.text
        },
        next: {
          user$: of(null),
          revision: response.next.revision,
          text: ''
        }
      }
    })
  );

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
          pageId: 197
        }),
      0
    );
  }
}
