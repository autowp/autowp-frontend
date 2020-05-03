import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription, of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ACLService } from '../services/acl.service';

@Component({
  selector: 'app-twins-group',
  templateUrl: './twins-group.component.html'
})
@Injectable()
export class TwinsGroupComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public canEdit = false;
  public selectedBrands: string[] = [];

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService
  ) {}

  ngOnInit(): void {


    this.acl
      .isAllowed('twins', 'edit')
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('group'), 10)),
        distinctUntilChanged(),
        debounceTime(10),
        switchMap(group => {
          if (! group) {
            return of(null);
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
        })
      )
      .subscribe(group => {
        this.group = group;
        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              nameTranslated: group.name_text,
              pageId: 25
            }),
          0
        );

        const result = [];
        for (const item of group.childs) {
          for (const brand of item.brands) {
            result.push(brand.catname);
          }
        }

        this.selectedBrands = result;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
