import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../services/item';
import {EMPTY} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-deteless',
  templateUrl: './dateless.component.html',
})
export class CarsDatelessComponent implements OnInit {
  public data$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
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
        order: 'age',
        page,
        limit: 10,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 1}), 0);
  }
}
