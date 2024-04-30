import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIGetTextRequest} from '@grpc/spec.pb';
import {TextClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {APIUser, UserService} from '@services/user';
import * as JsDiff from 'diff';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

interface Diff {
  added: boolean;
  removed: boolean;
  value: string;
}

interface InfoText {
  current: {
    revision: string;
    text: string;
    user$: Observable<APIUser | null>;
  } | null;
  diff: Diff[];
  next: {
    revision: string;
  } | null;
  prev: {
    revision: string;
    text: string;
    user$: Observable<APIUser | null>;
  } | null;
}

@Component({
  selector: 'app-info-text',
  templateUrl: './text.component.html',
})
export class InfoTextComponent implements OnInit {
  private readonly id$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  private readonly revision$ = this.route.queryParamMap.pipe(
    map((params) => params.get('revision')),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly data$: Observable<InfoText> = combineLatest([this.id$, this.revision$]).pipe(
    switchMap(([id, revision]) =>
      this.textClient.getText(
        new APIGetTextRequest({
          id: id ? id : undefined,
          revision: revision ? revision : undefined,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      current: response.current
        ? {
            revision: response.current.revision,
            text: response.current.text,
            user$: response.current.userId ? this.userService.getUser$(+response.current.userId, {}) : of(null),
          }
        : null,
      diff: JsDiff.diffChars(response.prev?.text ? response.prev.text : '', response.current?.text || '') as Diff[],
      next:
        response.next && response.next.revision !== '0'
          ? {
              revision: response.next.revision,
            }
          : null,
      prev:
        response.prev && response.prev.revision !== '0'
          ? {
              revision: response.prev.revision,
              text: response.prev.text,
              user$: response.prev.userId ? this.userService.getUser$(+response.prev.userId, {}) : of(null),
            }
          : null,
    })),
  );

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly textClient: TextClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 197}), 0);
  }
}
