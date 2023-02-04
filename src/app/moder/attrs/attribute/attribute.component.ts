import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {combineLatest, BehaviorSubject, Observable, EMPTY} from 'rxjs';
import {PageEnvService} from '../../../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {APIAttrAttribute, APIAttrsService, APIAttrAttributeGetResponse} from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIService} from '../../../services/api.service';
import {getAttrListOptionsTranslation, getAttrsTranslation, getUnitTranslation} from '../../../utils/translations';

@Component({
  selector: 'app-moder-attrs-attribute',
  templateUrl: './attribute.component.html',
})
export class ModerAttrsAttributeComponent {
  public loading = 0;
  public addLoading = 0;
  public addListOptionLoading = 0;

  public unitOptions$ = this.attrsService.getUnits$().pipe(
    map((items) => [
      {id: null, name: '-'},
      items.map((item) => ({
        id: item.id,
        name: getUnitTranslation(item.id, 'name'),
      })),
    ]),
    shareReplay(1)
  );

  public defaultAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null,
  };

  public newAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null,
  };

  public listOptionsOptions: {
    id: number | null;
    name: string;
  }[] = [];
  public newListOption = {
    parent_id: null,
    name: '',
  };
  private listOptionsChange$ = new BehaviorSubject<null>(null);

  private attributeID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1)
  );

  public attribute$ = this.attributeID$.pipe(
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

  public attributes$ = this.attributeID$.pipe(
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

  public listOptions$ = combineLatest([this.attributeID$, this.listOptionsChange$]).pipe(
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

  private types$ = this.attrsService.getAttributeTypes$().pipe(shareReplay(1));

  public typeOptions$ = this.attrsService.getAttributeTypes$().pipe(
    map((types) => [
      {id: null, name: '-'},
      ...types.map((item) => ({
        id: item.id,
        name: getAttrListOptionsTranslation(item.name),
      })),
    ])
  );

  public typeMap$: Observable<{[id: number]: string}> = this.types$.pipe(
    map((types) => {
      const typeMap = {};
      for (const item of types) {
        typeMap[item.id] = item.name;
      }
      return typeMap;
    })
  );

  constructor(
    private api: APIService,
    private attrsService: APIAttrsService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {
    Object.assign(this.newAttribute, this.defaultAttribute);
  }

  public saveAttribute(attribute: APIAttrAttribute) {
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

  public addAttribute(attribute: APIAttrAttribute) {
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

  public addListOption(attribute: APIAttrAttribute) {
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

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  public getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
