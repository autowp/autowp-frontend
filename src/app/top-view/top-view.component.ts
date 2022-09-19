import { Component, OnInit} from '@angular/core';
import {EMPTY} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PictureService} from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html'
})
export class TopViewComponent implements OnInit {
  public data$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(page => this.pictureService.getPictures({
      status: 'accepted',
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
      limit: 18,
      page,
      perspective_id: 18,
      order: 15
    })),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService,
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
          pageId: 201
        }),
      0
    );
  }
}
