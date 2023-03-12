import {Component, OnInit} from '@angular/core';
import {UserService, APIUser} from '@services/user';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {TextClient} from '@grpc/spec.pbsc';
import {APIGetTextRequest} from '@grpc/spec.pb';

const JsDiff = require('diff');

interface Diff {
  removed: boolean;
  added: boolean;
  value: string;
}

interface InfoText {
  diff: Diff[];
  current: {
    user$: Observable<APIUser>;
    revision: string;
    text: string;
  };
  prev: {
    user$: Observable<APIUser>;
    revision: string;
    text: string;
  };
  next: {
    revision: string;
  };
}

@Component({
  selector: 'app-info-text',
  templateUrl: './text.component.html',
})
export class InfoTextComponent implements OnInit {
  private id$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private revision$ = this.route.queryParamMap.pipe(
    map((params) => params.get('revision')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public data$: Observable<InfoText> = combineLatest([this.id$, this.revision$]).pipe(
    switchMap(([id, revision]) =>
      this.textClient.getText(
        new APIGetTextRequest({
          id: id,
          revision: revision,
        })
      )
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((response) => ({
      diff: JsDiff.diffChars(response.prev.text ? response.prev.text : '', response.current.text) as Diff[],
      current: {
        user$: response.current.userId ? this.userService.getUser$(+response.current.userId, {}) : of(null),
        revision: response.current.revision,
        text: response.current.text,
      },
      prev:
        response.prev.revision !== '0'
          ? {
              user$: response.prev.userId ? this.userService.getUser$(+response.prev.userId, {}) : of(null),
              revision: response.prev.revision,
              text: response.prev.text,
            }
          : null,
      next:
        response.next.revision !== '0'
          ? {
              revision: response.next.revision,
            }
          : null,
    }))
  );

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private textClient: TextClient
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 197}), 0);
  }
}
