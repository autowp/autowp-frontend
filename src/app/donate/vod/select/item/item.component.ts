import {Component, Input} from '@angular/core';
import {APIItem, ItemFields, ItemRequest, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIItemParent, ItemParentService} from '@services/item-parent';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';
import {LanguageService} from '@services/language';

@Component({
  selector: 'app-donate-vod-select-item',
  styleUrls: ['./styles.scss'],
  templateUrl: './item.component.html',
})
export class DonateVodSelectItemComponent {
  @Input() set itemParent(itemParent: APIItemParent) {
    this.itemParent$.next(itemParent);
  }
  protected readonly itemParent$ = new BehaviorSubject<APIItemParent>(null);
  protected expanded = false;

  protected readonly item$: Observable<APIItem> = this.itemParent$.pipe(
    switchMap((itemParent) =>
      this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            childsCount: true,
            isCompilesItemOfDay: true,
            nameHtml: true,
          }),
          id: itemParent.item_id.toString(),
          language: this.languageService.language,
        }),
      ),
    ),
  );

  protected readonly childs$: Observable<APIItemParent[]> = this.itemParent$
    .pipe(
      switchMap((itemParent) =>
        this.itemParentService.getItems$({
          item_type_id: ItemType.ITEM_TYPE_VEHICLE,
          limit: 500,
          parent_id: itemParent.item_id,
        }),
      ),
      map((items) => items.items),
      catchError(e => {
        this.toastService.handleError(e);
        return EMPTY;
      }),
      shareReplay(1),
    );

  constructor(
    private readonly itemParentService: ItemParentService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService
  ) {}

  protected toggleItem() {
    this.expanded = !this.expanded;

    return false;
  }
}
