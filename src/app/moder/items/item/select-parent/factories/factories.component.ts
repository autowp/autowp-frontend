import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, ItemFields, ItemListOptions, ItemType, ListItemsRequest, Pages} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-select-parent-factories',
  templateUrl: './factories.component.html',
})
export class ModerItemsItemSelectParentFactoriesComponent {
  @Output() selected = new EventEmitter<string>();

  @Input() set itemID(value: string) {
    this.itemID$.next(value);
  }
  protected readonly itemID$ = new BehaviorSubject<null | string>(null);

  protected readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    map((page) => (page ? page : 0)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly factories$: Observable<{items?: APIItem[]; paginator?: Pages}> = this.page$.pipe(
    switchMap((page) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 100,
          options: new ItemListOptions({
            typeId: ItemType.ITEM_TYPE_FACTORY,
          }),
          page,
        }),
      ),
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected onSelect(itemID: string) {
    this.selected.emit(itemID);
    return false;
  }
}
