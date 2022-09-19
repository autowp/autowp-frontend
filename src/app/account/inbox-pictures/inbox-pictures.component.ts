import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {combineLatest, EMPTY} from 'rxjs';
import {PictureService} from '../../services/picture';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, catchError, map} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-inbox-pictures',
  templateUrl: './inbox-pictures.component.html'
})
export class AccountInboxPicturesComponent implements OnInit {
  public data$ = combineLatest([
    this.route.queryParamMap.pipe(
      map(params => parseInt(params.get('page'), 10)),
      distinctUntilChanged(),
      debounceTime(10),
    ),
    this.auth.getUser()
  ]).pipe(
    switchMap(([page, user]) => this.pictureService.getPictures({
      status: 'inbox',
      owner_id: user.id,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
      limit: 15,
      page,
      order: 1
    })),
    catchError(err => {
      this.toastService.response(err);
      return EMPTY;
    })
  );

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({pageId: 94}),
      0
    );
  }
}
