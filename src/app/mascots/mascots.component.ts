import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  imports: [RouterLink, ThumbnailComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-mascots',
  standalone: true,
  templateUrl: './mascots.component.html',
})
export class MascotsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly data$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((page) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        order: 15,
        page,
        perspective_id: 23,
        status: 'accepted',
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 201}), 0);
  }
}
