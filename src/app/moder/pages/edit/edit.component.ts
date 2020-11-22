import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PageService,
  APIPageLinearized,
  APIPage
} from '../../../services/page';
import { PageEnvService } from '../../../services/page-env.service';
import {switchMap, distinctUntilChanged, debounceTime, map} from 'rxjs/operators';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-moder-pages-edit',
  templateUrl: './edit.component.html'
})
@Injectable()
export class ModerPagesEditComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public item: APIPage = null;
  public loading = 0;
  public pages: APIPageLinearized[];

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    private pageEnv: PageEnvService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: 'page/70/name',
          pageId: 70
        }),
      0
    );

    this.pageService.getPagesPipe().subscribe(response => {
      this.pages = this.pageService.toPlainArray(response.items, 0);
    });

    this.routeSub = this.route.queryParamMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id => this.pageService.getPage(id))
      )
      .subscribe(
        response => (this.item = response),
        () => {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public save() {
    this.loading++;

    this.api
      .request<void>('PUT', 'page/' + this.item.id, {body: {
        parent_id: this.item.parent_id,
        name: this.item.name,
        title: this.item.title,
        breadcrumbs: this.item.breadcrumbs,
        url: this.item.url,
        is_group_node: this.item.is_group_node ? 1 : 0,
        registered_only: this.item.registered_only ? 1 : 0,
        guest_only: this.item.guest_only ? 1 : 0,
        class: this.item.class
      }})
      .subscribe(
        () => {
          this.loading--;
        },
        () => {
          this.loading--;
        }
      );
  }
}
