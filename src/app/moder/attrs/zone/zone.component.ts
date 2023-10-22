import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AttrZoneAttributesRequest} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIAttrsService, AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-zone',
  templateUrl: './zone.component.html',
})
export class ModerAttrsZoneComponent {
  private readonly zoneID$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly zone$ = this.zoneID$.pipe(
    switchMap((id) => this.attrsService.getZone$(id)),
    tap((zone) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 142,
        title: zone.name,
      });
    }),
    shareReplay(1),
  );

  protected readonly attributes$: Observable<AttrAttributeTreeItem[]> = this.attrsService.getAttributes$(null, null);

  protected readonly zoneAttributes$ = this.zoneID$.pipe(
    switchMap((zoneID) => this.attrsClient.getZoneAttributes(new AttrZoneAttributesRequest({zoneId: zoneID}))),
    map((zoneAttributes) => {
      const zoneAttribute: {
        [key: string]: boolean;
      } = {};
      for (const item of zoneAttributes.items) {
        zoneAttribute[item.attributeId] = true;
      }
      return zoneAttribute;
    }),
  );

  constructor(
    private readonly attrsService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly attrsClient: AttrsClient,
  ) {}
}
