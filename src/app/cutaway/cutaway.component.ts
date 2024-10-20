import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-cutaway',
  templateUrl: './cutaway.component.html',
})
export class CutawayComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly query$ = this.route.queryParamMap.pipe(
    switchMap((params) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        order: 15,
        page: parseInt(params.get('page') || '', 10),
        perspective_id: 9,
        status: 'accepted',
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 109}), 0);
  }
}
