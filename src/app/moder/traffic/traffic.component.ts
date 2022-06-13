import { Component, OnInit} from '@angular/core';
import { IpService } from '../../services/ip';
import { PageEnvService } from '../../services/page-env.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {TrafficClient} from '../../../../generated/spec.pbsc';
import { Empty } from '@ngx-grpc/well-known-types';
import {
  AddToTrafficBlacklistRequest,
  AddToTrafficWhitelistRequest,
  APITrafficTopItem,
  DeleteFromTrafficBlacklistRequest
} from '../../../../generated/spec.pb';

interface ListItem {
  item: APITrafficTopItem;
  hostname$: Observable<string>;
}

@Component({
  selector: 'app-moder-traffic',
  templateUrl: './traffic.component.html'
})
export class ModerTrafficComponent implements OnInit {
  private change$ = new BehaviorSubject<null>(null);

  public items$: Observable<ListItem[]> = this.change$.pipe(
    switchMap(() => this.trafficGrpc.getTop(new Empty())),
    map(response => response.items.map(item => ({
      item,
      hostname$: this.ipService.getHostByAddr(item.ip)
    })))
  );

  constructor(
    private trafficGrpc: TrafficClient,
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
  }

  public addToWhitelist(ip: string) {
    this.trafficGrpc.addToWhitelist(new AddToTrafficWhitelistRequest({ip})).subscribe(() => this.change$.next(null));
  }

  public addToBlacklist(ip: string) {
    this.trafficGrpc.addToBlacklist(new AddToTrafficBlacklistRequest({
      ip: ip,
      period: 240,
      reason: ''
    })).subscribe(() => this.change$.next(null));
  }

  public removeFromBlacklist(ip: string) {
    this.trafficGrpc.deleteFromBlacklist(new DeleteFromTrafficBlacklistRequest({ip})).subscribe(() => this.change$.next(null));
  }
}
