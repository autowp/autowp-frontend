import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {EMPTY, combineLatest, of} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-twins-group-pictures-list',
  templateUrl: './list.component.html',
})
export class TwinsGroupPicturesListComponent {
  protected readonly id$ = this.route.parent.parent.paramMap.pipe(
    map((params) => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly group$ = this.id$.pipe(
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.itemService.getItem$(group, {fields: 'name_text,name_html'});
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 28,
            title: $localize`All pictures of ${group.name_text}`,
          }),
        0
      );
    }),
    shareReplay(1)
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged()
  );

  protected readonly data$ = combineLatest([this.page$, this.id$]).pipe(
    switchMap(([page, groupId]) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        item_id: groupId,
        limit: 24,
        order: 16,
        page: page,
        status: 'accepted',
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null as APIPictureGetResponse);
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService,
    private readonly toastService: ToastsService,
    private readonly router: Router
  ) {}
}
