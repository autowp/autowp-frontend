import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {APIGetTextRequest, APIUser} from '@grpc/spec.pb';
import {TextClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import * as JsDiff from 'diff';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {UserComponent} from '../../user/user/user.component';

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
  imports: [RouterLink, UserComponent, AsyncPipe],
  selector: 'app-info-text',
  templateUrl: './text.component.html',
})
export class InfoTextComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly textClient = inject(TextClient);

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
            user$: response.current.userId ? this.userService.getUser$(response.current.userId) : of(null),
          }
        : null,
      diff: JsDiff.diffChars(response.prev?.text ? response.prev.text : '', response.current?.text ?? '') as Diff[],
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
              user$: response.prev.userId ? this.userService.getUser$(response.prev.userId) : of(null),
            }
          : null,
    })),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 197}), 0);
  }
}
