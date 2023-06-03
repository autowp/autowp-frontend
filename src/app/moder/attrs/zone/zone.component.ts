import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map, shareReplay, tap} from 'rxjs/operators';
import {APIAttrsService, APIAttrZone} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '@services/api.service';

interface APIAttrZoneAttributesGetResponse {
  items: {
    attribute_id: number;
    zone_id: number;
  }[];
}

export interface APIAttrZoneAttributeChange {
  id: number;
  value: boolean;
}

@Component({
  selector: 'app-moder-attrs-zone',
  templateUrl: './zone.component.html',
})
export class ModerAttrsZoneComponent {
  protected readonly zoneID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  protected readonly zone$ = this.zoneID$.pipe(
    switchMap((id) => this.attrsService.getZone$(id)),
    tap((zone) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        title: zone.name,
        pageId: 142,
      });
    }),
    shareReplay(1)
  );

  protected readonly attributes$ = this.attrsService
    .getAttributes$({recursive: true})
    .pipe(map((response) => response.items));

  protected readonly zoneAttributes$ = this.zoneID$.pipe(
    switchMap((zoneID) =>
      this.api.request<APIAttrZoneAttributesGetResponse>('GET', 'attr/zone-attribute', {
        params: {
          zone_id: zoneID.toString(),
        },
      })
    ),
    map((zoneAttributes) => {
      const zoneAttribute: {
        [key: number]: boolean;
      } = {};
      for (const item of zoneAttributes.items) {
        zoneAttribute[item.attribute_id] = true;
      }
      return zoneAttribute;
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly attrsService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  protected change(zone: APIAttrZone, change: APIAttrZoneAttributeChange) {
    if (change.value) {
      this.api
        .request<void>('POST', 'attr/zone-attribute', {
          body: {
            zone_id: zone.id,
            attribute_id: change.id,
          },
        })
        .subscribe({error: (response: unknown) => this.toastService.handleError(response)});
    } else {
      this.api.request('DELETE', 'attr/zone-attribute/' + zone.id + '/' + change.id).subscribe({
        error: (response: unknown) => this.toastService.handleError(response),
      });
    }
  }
}
