import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {APIPage, APIPageLinearized, PageService} from '../../services/page';
import {PageEnvService} from '../../services/page-env.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {switchMapTo} from 'rxjs/operators';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-moder-pages',
  templateUrl: './pages.component.html'
})
@Injectable()
export class ModerPagesComponent implements OnInit, OnDestroy {
  public items: APIPageLinearized[] = [];
  public canManage = false;
  private load$ = new BehaviorSubject<null>(null);
  private sub: Subscription;

  constructor(
    private api: APIService,
    private acl: ACLService,
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
          name: 'page/68/name',
          pageId: 68
        }),
      0
    );

    this.sub = combineLatest([
      this.acl.isAllowed(Resource.HOTLINKS, Privilege.MANAGE),
      this.load$.pipe(switchMapTo(this.pageService.getPagesPipe()))
    ]).subscribe(([canManage, items]) => {
      this.canManage = canManage;
      this.items = this.pageService.toPlainArray(items.items, 0);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public move(page: APIPage, direction: any) {
    this.api
      .request<void>('PUT', 'page/' + page.id, {body: {
        position: direction
      }})
      .subscribe(() => {
        this.load$.next(null);
      });
  }

  public deletePage(ev: any, page: APIPage) {
    if (window.confirm('Would you like to delete page?')) {
      this.api.request('DELETE', 'page/' + page.id).subscribe(() => {
        this.load$.next(null);
      });
    }
  }
}
