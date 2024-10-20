import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AttrZone, AttrZoneAttributesRequest} from '@grpc/spec.pb';
import {AttrsClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIAttrsService, AttrAttributeTreeItem} from '../../../api/attrs/attrs.service';
import {ModerAttrsZoneAttributeListComponent} from './attribute-list/attribute-list.component';

@Component({
  imports: [RouterLink, ModerAttrsZoneAttributeListComponent, AsyncPipe],
  selector: 'app-moder-attrs-zone',
  standalone: true,
  templateUrl: './zone.component.html',
})
export class ModerAttrsZoneComponent {
  private readonly attrsService = inject(APIAttrsService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly attrsClient = inject(AttrsClient);
  private readonly router = inject(Router);

  private readonly zoneID$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
  );

  protected readonly zone$: Observable<AttrZone> = this.zoneID$.pipe(
    switchMap((id) => (id ? this.attrsService.getZone$(id) : of(null))),
    switchMap((zone) => {
      if (!zone) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(zone);
    }),
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
    switchMap((zoneID) =>
      zoneID ? this.attrsClient.getZoneAttributes(new AttrZoneAttributesRequest({zoneId: zoneID})) : EMPTY,
    ),
    map((zoneAttributes) => {
      const zoneAttribute: {
        [key: string]: boolean;
      } = {};
      for (const item of zoneAttributes.items ? zoneAttributes.items : []) {
        zoneAttribute[item.attributeId] = true;
      }
      return zoneAttribute;
    }),
  );
}
