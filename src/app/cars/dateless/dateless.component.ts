import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { ItemService, APIItem } from '../../services/item';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-cars-deteless',
  templateUrl: './dateless.component.html'
})
@Injectable()
export class CarsDatelessComponent implements OnInit, OnDestroy {
  private querySub: Subscription;
  public items: APIItem[] = [];
  public paginator: APIPaginator;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/103/name',
          pageId: 1
        }),
      0
    );
  }

  ngOnInit(): void {
    this.querySub = this.route.queryParamMap
      .pipe(
        map(params => parseInt(params.get('page'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(page =>
          this.itemService.getItems({
            dateless: true,
            fields: [
              'name_html,name_default,description,has_text,produced',
              'design,engine_vehicles',
              'url,can_edit_specs,specs_route',
              'categories.name_html,twins_groups',
              'preview_pictures.picture,preview_pictures.route,childs_count,total_pictures'
            ].join(','),
            order: 'age',
            page,
            limit: 10
          })
        )
      )
      .subscribe(
        result => {
          this.items = result.items;
          this.paginator = result.paginator;
        },
        response => this.toastService.response(response)
      );
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }
}
