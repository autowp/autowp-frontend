import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpService } from '../../services/ip';
import { PageEnvService } from '../../services/page-env.service';
import {Subscription, BehaviorSubject} from 'rxjs';
import {map, switchMapTo} from 'rxjs/operators';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import { Empty } from '@ngx-grpc/well-known-types';
import {
  AddToTrafficBlacklistRequest,
  AddToTrafficWhitelistRequest,
  APITrafficTopItem,
  DeleteFromTrafficBlacklistRequest
} from '../../../../generated/spec.pb';

interface ListItem {
  item: APITrafficTopItem;
  hostname: string;
}

@Component({
  selector: 'app-moder-traffic',
  templateUrl: './traffic.component.html'
})
export class ModerTrafficComponent implements OnInit, OnDestroy {
  public items: ListItem[];
  private sub: Subscription;
  private change$ = new BehaviorSubject<null>(null);

  constructor(
    private grpc: AutowpClient,
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
        switchMapTo(this.grpc.getTrafficTop(new Empty())),
        map(response => response.items.map(item => ({item, hostname: ''})))
      )
      .subscribe(items => {
        this.items = items;
        items.forEach(item => {
          this.ipService.getHostByAddr(item.item.ip).subscribe(hostname => {
            item.hostname = hostname;
          });
        })
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public addToWhitelist(ip: string) {
    this.grpc.addToTrafficWhitelist(new AddToTrafficWhitelistRequest({ip})).subscribe(() => this.change$.next(null));
  }

  public addToBlacklist(ip: string) {
    this.grpc.addToTrafficBlacklist(new AddToTrafficBlacklistRequest({
      ip: ip,
      period: 240,
      reason: ''
    })).subscribe(() => this.change$.next(null));
  }

  public removeFromBlacklist(ip: string) {
    this.grpc.deleteFromTrafficBlacklist(new DeleteFromTrafficBlacklistRequest({ip})).subscribe(() => this.change$.next(null));
  }
}
