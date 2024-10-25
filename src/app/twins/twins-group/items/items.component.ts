import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../comments/comments/comments.component';
import {MarkdownComponent} from '../../../utils/markdown/markdown.component';
import {TwinsItemComponent} from '../../item/item.component';

@Component({
  imports: [TwinsItemComponent, MarkdownComponent, CommentsComponent, AsyncPipe],
  selector: 'app-twins-group-items',
  standalone: true,
  templateUrl: './items.component.html',
})
export class TwinsGroupItemsComponent {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);

  protected readonly group$: Observable<APIItem | null> = this.route.parent!.paramMap.pipe(
    map((params) => parseInt(params.get('group') || '', 10)),
    distinctUntilChanged(),
    switchMap((group) => {
      if (!group) {
        return of(null);
      }
      return this.itemService.getItem$(group, {
        fields:
          'name_text,' +
          'childs.name_html,childs.name_default,childs.description,childs.has_text,childs.produced,' +
          'childs.design,childs.engine_vehicles,' +
          'childs.url,childs.can_edit_specs,childs.specs_route,' +
          'childs.categories.name_html,childs.brands,' +
          'childs.preview_pictures,childs.total_pictures',
      });
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 25,
            title: group ? group.name_text : '',
          }),
        0,
      );
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly CommentsType = CommentsType;
}
