import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../services/api.service';
import { ItemService, APIItem } from '../services/item';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { chunkBy } from '../chunk';
import { ACLService } from '../services/acl.service';

@Component({
  selector: 'app-twins',
  templateUrl: './twins.component.html'
})
@Injectable()
export class TwinsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public paginator: APIPaginator;
  public groups: APIItem[] = [];
  public canEdit = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          name: 'page/25/name',
          pageId: 25
        }),
      0
    );

    this.acl
      .isAllowed('twins', 'edit')
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.itemService.getItems({
            type_id: 4,
            limit: 20,
            fields:
              'name_text,name_html,has_child_specs,accepted_pictures_count,comments_topic_stat',
            page: params.page
          });
        }),
        tap(response => {
          this.groups = response.items;
          this.paginator = response.paginator;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public chunk(items: APIItem[]): APIItem[][] {
    return chunkBy(items, 4);
  }
}
