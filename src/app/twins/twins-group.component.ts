import { Component} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import { of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twins-group',
  templateUrl: './twins-group.component.html'
})
export class TwinsGroupComponent {
  public group$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(group => {
      if (! group) {
        return of(null as APIItem);
      }
      return this.itemService.getItem(group, {
        fields:
          'name_text,name_html,has_child_specs,accepted_pictures_count,' +
          'childs.name_html,childs.name_default,childs.description,childs.has_text,childs.produced,' +
          'childs.design,childs.engine_vehicles,' +
          'childs.url,childs.can_edit_specs,childs.specs_route,' +
          'childs.categories.name_html,childs.brands,' +
          'childs.preview_pictures,childs.total_pictures'
      });
    }),
    tap(group => {
      setTimeout(
        () =>
          this.pageEnv.set({
            nameTranslated: group.name_text,
            pageId: 25
          }),
        0
      );
    }),
    shareReplay(1)
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

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
  ) {}
}
