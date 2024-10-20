import {Component, inject, OnInit} from '@angular/core';
import {
  AddToTrafficBlacklistRequest,
  AddToTrafficWhitelistRequest,
  APITrafficTopItem,
  DeleteFromTrafficBlacklistRequest,
} from '@grpc/spec.pb';
import {TrafficClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {IpService} from '@services/ip';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

interface ListItem {
  hostname$: Observable<string>;
  item: APITrafficTopItem;
}

@Component({
  selector: 'app-moder-traffic',
  templateUrl: './traffic.component.html',
})
export class ModerTrafficComponent implements OnInit {
  private readonly trafficGrpc = inject(TrafficClient);
  private readonly ipService = inject(IpService);
  private readonly pageEnv = inject(PageEnvService);

  private readonly change$ = new BehaviorSubject<void>(void 0);

  protected readonly items$: Observable<ListItem[]> = this.change$.pipe(
    switchMap(() => this.trafficGrpc.getTop(new Empty())),
    map((response) =>
      (response.items ? response.items : []).map((item) => ({
        hostname$: this.ipService.getHostByAddr$(item.ip),
        item,
      })),
    ),
  );

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 77,
        }),
      0,
    );
  }

  protected addToWhitelist(ip: string) {
    this.trafficGrpc.addToWhitelist(new AddToTrafficWhitelistRequest({ip})).subscribe(() => this.change$.next());
  }

  protected addToBlacklist(ip: string) {
    this.trafficGrpc
      .addToBlacklist(
        new AddToTrafficBlacklistRequest({
          ip: ip,
          period: 240,
          reason: '',
        }),
      )
      .subscribe(() => this.change$.next());
  }

  protected removeFromBlacklist(ip: string) {
    this.trafficGrpc
      .deleteFromBlacklist(new DeleteFromTrafficBlacklistRequest({ip}))
      .subscribe(() => this.change$.next());
  }
}
