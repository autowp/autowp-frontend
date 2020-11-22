import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {PageEnvService} from '../../services/page-env.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {switchMapTo} from 'rxjs/operators';
import {APIHotlinksHost, HotlinksService} from './hotlinks.service';

@Component({
  selector: 'app-moder-hotlinks',
  templateUrl: './hotlinks.component.html'
})
@Injectable()
export class ModerHotlinksComponent implements OnInit, OnDestroy {
  public hosts: APIHotlinksHost[] = [];
  public canManage = false;
  private sub: Subscription;
  private change$ = new BehaviorSubject<null>(null);

  constructor(
    private service: HotlinksService,
    private acl: ACLService,
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
          name: 'page/67/name',
          pageId: 67
        }),
      0
    );

    this.sub = combineLatest([
      this.acl.isAllowed(Resource.HOTLINKS, Privilege.MANAGE),
      this.change$.pipe(switchMapTo(this.service.getHosts()))
    ])
      .subscribe(([canManage, hosts]) => {
        this.canManage = canManage;
        this.hosts = hosts.items;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public clearAll() {
    this.service.clearAll().subscribe(() => {
      this.change$.next(null);
    });
  }

  public clear(host: string) {
    this.service.clear(host).subscribe(() => {
      this.change$.next(null);
    });
  }

  public addToWhitelist(host: string) {
    this.service.addToWhitelist(host).subscribe(() => {
      this.change$.next(null);
    });
  }

  public addToWhitelistAndClear(host: string) {
    this.addToWhitelist(host);
    this.clear(host);
  }

  public addToBlacklist(host: string) {
    this.service.addToBlacklist(host).subscribe(() => {
      this.change$.next(null);
    });
  }
}
