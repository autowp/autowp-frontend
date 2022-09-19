import { Component, OnInit} from '@angular/core';
import {EMPTY} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PictureService} from '../services/picture';
import { PageEnvService } from '../services/page-env.service';
import {catchError, switchMap} from 'rxjs/operators';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-cutaway',
  templateUrl: './cutaway.component.html'
})
export class CutawayComponent implements OnInit {
  public query$ = this.route.queryParamMap.pipe(
    switchMap(params =>
      this.pictureService.getPictures({
        status: 'accepted',
        fields:
          'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        page: parseInt(params.get('page'), 10),
        perspective_id: 9,
        order: 15
      })
    ),
    catchError(response => {
      this.toastService.response(response)
      return EMPTY;
    })
  );

  constructor(
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
          pageId: 109
        }),
      0
    );
  }
}
