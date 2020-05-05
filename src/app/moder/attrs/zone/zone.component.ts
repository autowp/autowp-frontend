import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {Subscription, combineLatest, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageEnvService } from '../../../services/page-env.service';
import {distinctUntilChanged, debounceTime, switchMap, map} from 'rxjs/operators';
import { APIAttrZone, APIAttrAttribute, APIAttrsService } from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import { APIService } from '../../../services/api.service';

export interface APIAttrZoneAttributesGetResponse {
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
  templateUrl: './zone.component.html'
})
@Injectable()
export class ModerAttrsZoneComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public zone: APIAttrZone;
  public attributes: APIAttrAttribute[] = [];
  public zoneAttribute: {
    [key: number]: boolean;
  } = {};

  constructor(
    private api: APIService,
    private attrsService: APIAttrsService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(id => this.attrsService.getZone(id)),
        switchMap(zone => combineLatest([
          of(zone),
          this.attrsService.getAttributes({ recursive: true }),
          this.api.request<APIAttrZoneAttributesGetResponse>('GET', 'attr/zone-attribute', {
            params: {
              zone_id: zone.id.toString()
            }
          })
        ]))
      )
      .subscribe(([zone, attributes, zoneAttributes]) => {
        this.zone = zone;

        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: zone.name,
          pageId: 142
        });

        this.attributes = attributes.items;

        for (const item of zoneAttributes.items) {
          this.zoneAttribute[item.attribute_id] = true;
        }
      });
  }

  public change(change: APIAttrZoneAttributeChange) {
    if (change.value) {
      this.api
        .request<void>('POST', 'attr/zone-attribute', {body: {
          zone_id: this.zone.id,
          attribute_id: change.id
        }})
        .subscribe(
          () => {},
          response => this.toastService.response(response)
        );
    } else {
      this.api
        .request('DELETE', 'attr/zone-attribute/' + this.zone.id + '/' + change.id)
        .subscribe(
          () => {},
          response => this.toastService.response(response)
        );
    }
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
