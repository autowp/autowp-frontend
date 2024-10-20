import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-deteless',
  templateUrl: './dateless.component.html',
})
export class CarsDatelessComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);

  protected readonly data$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    switchMap((page) =>
      this.itemService.getItems$({
        dateless: true,
        fields: [
          'name_html,name_default,description,has_text,produced',
          'design,engine_vehicles',
          'url,can_edit_specs,specs_route',
          'categories.name_html,twins_groups',
          'preview_pictures.picture,preview_pictures.route,childs_count,total_pictures',
        ].join(','),
        limit: 10,
        order: 'age',
        page,
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);
  }
}
