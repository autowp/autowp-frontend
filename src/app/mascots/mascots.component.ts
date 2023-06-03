import {Component, OnInit} from '@angular/core';
import {EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PictureService} from '@services/picture';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-mascots',
  templateUrl: './mascots.component.html',
})
export class MascotsComponent implements OnInit {
  protected readonly data$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.pictureService.getPictures$({
        status: 'accepted',
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        page,
        perspective_id: 23,
        order: 15,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 201}), 0);
  }
}
