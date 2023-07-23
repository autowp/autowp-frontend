import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {getAttrListOptionsTranslation, getAttrsTranslation, getUnitTranslation} from '@utils/translations';
import {Observable, combineLatest} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIAttrsService} from '../../../api/attrs/attrs.service';

@Component({
  selector: 'app-moder-attrs-attribute',
  templateUrl: './attribute.component.html',
})
export class ModerAttrsAttributeComponent {
  private readonly attributeID$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly attribute$ = this.attributeID$.pipe(
    switchMap((id) => this.attrsService.getAttribute$(id)),
    tap((attribute) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 101,
        title: getAttrsTranslation(attribute.name),
      });
    }),
    shareReplay(1)
  );

  protected readonly attributes$ = this.attributeID$.pipe(
    switchMap((attributeID) => this.attrsService.getAttributes$(null, attributeID))
  );

  protected readonly listOptions$: Observable<string[]> = this.attributeID$.pipe(
    switchMap((attributeID) => this.attrsService.getListOptions$(attributeID)),
    map((response) => response.toObject().items.map((l) => getAttrListOptionsTranslation(l.name)))
  );

  protected readonly typeOption$ = combineLatest([this.attribute$, this.attrsService.attributeTypes$]).pipe(
    map(([attribute, options]) => options.find((o) => o.id === attribute.typeId))
  );

  protected readonly typeMap$: Observable<{[id: number]: string}> = this.attrsService.attributeTypes$.pipe(
    map((types) => {
      const typeMap = {};
      for (const item of types) {
        typeMap[item.id] = item.name;
      }
      return typeMap;
    })
  );

  constructor(
    private readonly attrsService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService
  ) {}

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
