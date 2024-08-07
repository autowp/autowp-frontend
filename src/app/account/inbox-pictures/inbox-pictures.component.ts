import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {EMPTY, combineLatest} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-inbox-pictures',
  templateUrl: './inbox-pictures.component.html',
})
export class AccountInboxPicturesComponent implements OnInit {
  protected readonly data$ = combineLatest([
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') || '', 10)),
      distinctUntilChanged(),
      debounceTime(10),
    ),
    this.auth.getUser$(),
  ]).pipe(
    switchMap(([page, user]) =>
      user
        ? this.pictureService.getPictures$({
            fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
            limit: 15,
            order: 1,
            owner_id: user.id,
            page,
            status: 'inbox',
          })
        : EMPTY,
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
  );

  constructor(
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 94}), 0);
  }
}
