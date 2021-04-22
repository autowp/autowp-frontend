import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpService } from '../../services/ip';
import { APIUser } from '../../services/user';
import { PageEnvService } from '../../services/page-env.service';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap, switchMap, switchMapTo } from 'rxjs/operators';
import { APIService } from '../../services/api.service';

export interface APITrafficItem {
  ip: string;
  hostname?: string;
  count: number;
  whois_url: string;
  users: APIUser[];
  ban: {
    user: APIUser;
    reason: string;
    up_to: string;
  };
  in_whitelist: boolean;
}

export interface APITrafficGetResponse {
  items: APITrafficItem[];
}

@Component({
  selector: 'app-moder-traffic',
  templateUrl: './traffic.component.html'
})
export class ModerTrafficComponent implements OnInit, OnDestroy {
  public items: APITrafficItem[];
  private sub: Subscription;
  private change$ = new BehaviorSubject<null>(null);

  constructor(
    private api: APIService,
    private ipService: IpService,
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
          nameTranslated: $localize `Traffic`,
          pageId: 77
        }),
      0
    );

    this.sub = this.change$
      .pipe(
        switchMapTo(this.api.request<APITrafficGetResponse>('GET', 'traffic')),
        map(response => response.items),
        tap(items => {
          this.items = items;
        }),
        switchMap(items => forkJoin(
          items.map(item => this.ipService
            .getHostByAddr(item.ip)
            .pipe(tap(hostname => (item.hostname = hostname)))
          ))
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public addToWhitelist(ip: string) {
    this.api
      .request<void>('POST', 'traffic/whitelist', {body: {
        ip
      }})
      .subscribe(() => this.change$.next(null));
  }

  public addToBlacklist(ip: string) {
    this.api
      .request<void>('POST', 'traffic/blacklist', {body: {
        ip,
        period: 240,
        reason: ''
      }})
      .subscribe(() => this.change$.next(null));
  }

  public removeFromBlacklist(ip: string) {
    this.api
      .request<void>('DELETE', 'traffic/blacklist/' + ip)
      .subscribe(() => this.change$.next(null));
  }
}
