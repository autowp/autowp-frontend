import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {Subscription, combineLatest, EMPTY} from 'rxjs';
import {
  PictureService,
  APIPicture
} from '../../services/picture';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, catchError, map} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-account-inbox-pictures',
  templateUrl: './inbox-pictures.component.html'
})
@Injectable()
export class AccountInboxPicturesComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public pictures: APIPicture[] = [];
  public paginator: APIPaginator;

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
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/94/name',
          pageId: 94
        }),
      0
    );

    this.querySub = combineLatest([this.route.queryParams, this.auth.getUser()])
      .pipe(
        map(data => ({ params: data[0], user: data[1] })),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(data => this.pictureService.getPictures({
          status: 'inbox',
          owner_id: data.user.id,
          fields:
            'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 15,
          page: data.params.page,
          order: 1
        })),
        catchError(err => {
          this.toastService.response(err);
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.pictures = response.pictures;
        this.paginator = response.paginator;
      });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
