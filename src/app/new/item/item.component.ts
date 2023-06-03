import {Component} from '@angular/core';
import {ItemService} from '@services/item';
import {combineLatest, EMPTY} from 'rxjs';
import {PictureService} from '@services/picture';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, catchError, map, shareReplay, tap} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './item.component.html',
})
export class NewItemComponent {
  private itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public date$ = this.route.paramMap.pipe(
    map((params) => params.get('date')),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(30)
  );

  public item$ = this.itemID$.pipe(
    switchMap((itemID) => this.itemService.getItem$(itemID, {fields: 'name_html,name_text'})),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    tap((item) => {
      this.pageEnv.set({
        title: item.name_text,
        pageId: 210,
      });
    }),
    shareReplay(1)
  );

  public pictures$ = combineLatest([this.itemID$, this.date$, this.page$]).pipe(
    switchMap(([itemID, date, page]) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,moder_vote,votes,views,comments_count,name_html,name_text',
        limit: 24,
        status: 'accepted',
        accept_date: date,
        item_id: itemID,
        page,
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
