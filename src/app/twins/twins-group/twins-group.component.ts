import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemListOptions,
  ItemParentListOptions,
  ItemRequest,
  ItemType,
  ListItemsRequest,
} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {TwinsSidebarComponent} from '../sidebar.component';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TwinsSidebarComponent, AsyncPipe],
  selector: 'app-twins-group',
  templateUrl: './twins-group.component.html',
})
export class TwinsGroupComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly group$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('group') ?? ''),
    distinctUntilChanged(),
    switchMap((group) =>
      group
        ? this.itemsClient.item(
            new ItemRequest({
              fields: new ItemFields({
                acceptedPicturesCount: true,
                hasChildSpecs: true,
                nameHtml: true,
                nameText: true,
              }),
              id: group,
              language: this.languageService.language,
            }),
          )
        : EMPTY,
    ),
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(group);
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 25,
            title: group.nameText,
          }),
        0,
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly selectedBrands$: Observable<string[]> = this.group$.pipe(
    switchMap((group) =>
      this.itemsClient.list(
        new ListItemsRequest({
          options: new ItemListOptions({
            child: new ItemParentListOptions({
              itemParentParentByChild: new ItemParentListOptions({
                parentId: group.id,
              }),
            }),
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
        }),
      ),
    ),
    map((response) => (response.items || []).map((item) => item.catname)),
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();
}
