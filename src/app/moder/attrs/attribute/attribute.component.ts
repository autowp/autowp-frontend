import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {combineLatest, BehaviorSubject, Observable, EMPTY} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {APIAttrAttribute, APIAttrsService, APIAttrAttributeGetResponse} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {getAttrListOptionsTranslation, getAttrsTranslation, getUnitTranslation} from '@utils/translations';

@Component({
  selector: 'app-moder-attrs-attribute',
  templateUrl: './attribute.component.html',
})
export class ModerAttrsAttributeComponent {
  protected loading = 0;
  protected addLoading = 0;
  protected addListOptionLoading = 0;

  protected readonly unitOptions$ = this.attrsService.getUnits$().pipe(
    map((items) => [
      {id: null, name: '-'},
      items.map((item) => ({
        id: item.id,
        name: getUnitTranslation(item.id, 'name'),
      })),
    ]),
    shareReplay(1)
  );

  protected readonly defaultAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null,
  };

  protected readonly newAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null,
  };

  protected readonly listOptionsOptions: {
    id: number | null;
    name: string;
  }[] = [];
  protected readonly newListOption = {
    parent_id: null,
    name: '',
  };
  protected readonly listOptionsChange$ = new BehaviorSubject<null>(null);

  private readonly attributeID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  protected readonly attribute$ = this.attributeID$.pipe(
    switchMap((id) => this.attrsService.getAttribute$(id)),
    tap((attribute) => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        title: attribute.name,
        pageId: 101,
      });
    }),
    shareReplay(1)
  );

  protected readonly attributes$ = this.attributeID$.pipe(
    switchMap((attributeID) =>
      this.api.request<APIAttrAttributeGetResponse>('GET', 'attr/attribute', {
        params: {
          parent_id: attributeID.toString(),
          recursive: '0',
          fields: 'unit',
        },
      })
    )
  );

  protected readonly listOptions$ = combineLatest([this.attributeID$, this.listOptionsChange$]).pipe(
    switchMap(([attributeID]) =>
      this.attrsService.getListOptions$({
        attribute_id: attributeID,
      })
    ),
    map((listOptions) => [
      {id: null, name: '-'},
      ...listOptions.items.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    ])
  );

  private readonly types$ = this.attrsService.getAttributeTypes$().pipe(shareReplay(1));

  protected readonly typeOptions$ = this.attrsService.getAttributeTypes$().pipe(
    map((types) => [
      {id: null, name: '-'},
      ...types.map((item) => ({
        id: item.id,
        name: getAttrListOptionsTranslation(item.name),
      })),
    ])
  );

  protected readonly typeMap$: Observable<{[id: number]: string}> = this.types$.pipe(
    map((types) => {
      const typeMap = {};
      for (const item of types) {
        typeMap[item.id] = item.name;
      }
      return typeMap;
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly attrsService: APIAttrsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {
    Object.assign(this.newAttribute, this.defaultAttribute);
  }

  protected saveAttribute(attribute: APIAttrAttribute) {
    this.loading++;
    this.attrsService.updateAttribute$(attribute.id, attribute).subscribe({
      next: () => {
        this.loading--;
      },
      error: (response: unknown) => {
        this.toastService.handleError(response);
        this.loading--;
      },
    });
  }

  protected addAttribute(attribute: APIAttrAttribute) {
    this.newAttribute.parent_id = attribute.id;

    this.addLoading++;
    this.attrsService
      .createAttribute$(this.newAttribute)
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          this.addLoading--;

          return EMPTY;
        }),
        switchMap((response) => {
          const location = response.headers.get('Location');

          Object.assign(this.newAttribute, this.defaultAttribute);

          return this.attrsService.getAttributeByLocation$(location);
        })
      )
      .subscribe({
        next: (subresponse) => {
          this.router.navigate(['/moder/attrs/attribute', subresponse.id]);
          this.addLoading--;
        },
        error: (subresponse: unknown) => {
          this.toastService.handleError(subresponse);
          this.addLoading--;
        },
      });
  }

  protected addListOption(attribute: APIAttrAttribute) {
    this.addListOptionLoading++;

    this.attrsService
      .createListOption$({
        attribute_id: attribute.id,
        parent_id: this.newListOption.parent_id,
        name: this.newListOption.name,
      })
      .subscribe({
        next: () => {
          this.newListOption.name = '';

          this.listOptionsChange$.next(null);

          this.addListOptionLoading--;
        },
        error: (response: unknown) => {
          this.toastService.handleError(response);
          this.addListOptionLoading--;
        },
      });

    return false;
  }

  protected getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  protected getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
