import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIItem, CommentsType, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ItemService} from '@services/item';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../comments/comments/comments.component';
import {TwinsItemComponent} from '../../item/item.component';

@Component({
  imports: [TwinsItemComponent, MarkdownComponent, CommentsComponent, AsyncPipe],
  selector: 'app-twins-group-items',
  templateUrl: './items.component.html',
})
export class TwinsGroupItemsComponent {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly groupId$: Observable<string> = this.route.parent!.paramMap.pipe(
    map((params) => params.get('group') ?? ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly group$: Observable<APIItem | null> = this.groupId$.pipe(
    switchMap((group) => {
      if (!group) {
        return of(null);
      }

      return this.itemsClient.item(
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
      );
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 25,
            title: group ? group.nameText : '',
          }),
        0,
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly childs$ = this.groupId$.pipe(
    switchMap((groupId) =>
      groupId
        ? this.itemService.getItems$({
            fields:
              'name_html,name_default,description,has_text,produced,design,engine_vehicles,url,can_edit_specs,' +
              'specs_route,categories.name_html,preview_pictures,total_pictures', // brands
            limit: 500,
            parent_id: +groupId,
          })
        : EMPTY,
    ),
  );

  protected readonly CommentsType = CommentsType;
}
