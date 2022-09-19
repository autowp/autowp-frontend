import {Component} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import {combineLatest, of} from 'rxjs';
import {PageEnvService} from '../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {APIPictureGetResponse, PictureService} from '../services/picture';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-twins-group-pictures',
  templateUrl: './twins-group-pictures.component.html'
})
export class TwinsGroupPicturesComponent {
  public group$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(group => {
      if (!group) {
        return of(null as APIItem);
      }
      return this.itemService.getItem(group, {
        fields: 'name_text,name_html,childs.brands'
      });
    }),
    tap(group => {
      setTimeout(
        () =>
          this.pageEnv.set({
            nameTranslated: $localize `All pictures of ${group.name_text}`,
            pageId: 28
          }),
        0
      );
    }),
    shareReplay(1)
  );

  private page$ = this.route.queryParamMap.pipe(
    map(params => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  public selectedBrands$ = this.group$.pipe(
    map(group => {
      const result = [];
      for (const item of group.childs) {
        for (const brand of item.brands) {
          result.push(brand.catname);
        }
      }
      return result;
    })
  );

  public data$ = combineLatest([this.page$, this.group$]).pipe(
    switchMap(([page, group]) => this.pictureService.getPictures({
      status: 'accepted',
      item_id: group.id,
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
      limit: 24,
      order: 16,
      page: page
    })),
    catchError(err => {
      this.toastService.response(err);
      return of(null as APIPictureGetResponse);
    }),
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private toastService: ToastsService
  ) {}
}
