import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-twins-group-items',
  templateUrl: './items.component.html',
})
export class TwinsGroupItemsComponent {
  protected readonly group$ = this.route.parent.paramMap.pipe(
    map((params) => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    switchMap((group) => {
      if (!group) {
        return of(null as APIItem);
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
            title: group.name_text,
          }),
        0
      );
    }),
    shareReplay(1)
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService
  ) {}
}
