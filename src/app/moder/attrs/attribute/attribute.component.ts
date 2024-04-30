import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {getAttrListOptionsTranslation, getAttrsTranslation, getUnitTranslation} from '@utils/translations';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
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
    shareReplay(1),
  );

  protected readonly attribute$ = this.attributeID$.pipe(
    switchMap((id) => (id ? this.attrsService.getAttribute$(id) : of(null))),
    switchMap((attribute) => {
      if (!attribute) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(attribute);
    }),
    tap((attribute) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 101,
        title: getAttrsTranslation(attribute.name),
      });
    }),
    shareReplay(1),
  );

  protected readonly attributes$ = this.attributeID$.pipe(
    switchMap((attributeID) => this.attrsService.getAttributes$(null, attributeID)),
  );

  protected readonly listOptions$: Observable<string[]> = this.attributeID$.pipe(
    switchMap((attributeID) => (attributeID ? this.attrsService.getListOptions$(attributeID) : EMPTY)),
    map((response) => (response.items ? response.items : []).map((l) => getAttrListOptionsTranslation(l.name))),
  );

  protected readonly typeOption$ = combineLatest([this.attribute$, this.attrsService.attributeTypes$]).pipe(
    map(([attribute, options]) => options.find((o) => o.id === attribute.typeId)),
  );

  protected readonly typeMap$: Observable<{[id: number]: string}> = this.attrsService.attributeTypes$.pipe(
    map((types) => {
      const typeMap = {};
      for (const item of types) {
        typeMap[item.id] = item.name;
      }
      return typeMap;
    }),
  );

  constructor(
    private readonly attrsService: APIAttrsService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router,
  ) {}

  protected getUnitTranslation(id: string, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
