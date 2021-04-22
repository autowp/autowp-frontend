import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription, combineLatest, BehaviorSubject, of} from 'rxjs';
import { PageEnvService } from '../../../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { APIAttrAttribute, APIAttrListOption, APIAttrsService, APIAttrAttributeGetResponse } from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import { APIService } from '../../../services/api.service';
import {getAttrListOptionsTranslation, getAttrsTranslation, getUnitTranslation } from '../../../utils/translations';

@Component({
  selector: 'app-moder-attrs-attribute',
  templateUrl: './attribute.component.html'
})
export class ModerAttrsAttributeComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public attribute: APIAttrAttribute;
  public attributes: APIAttrAttribute[] = [];
  public loading = 0;
  public addLoading = 0;
  public addListOptionLoading = 0;

  public typeOptionsDefaults = [{ id: null, name: '-' }];
  public typeOptions: {
    id: number;
    name: string;
  }[] = [];
  public typeMap: { [id: number]: string } = {};

  public unitOptionsDefaults = [{ id: null, name: '-' }];
  public unitOptions: {
    id: number;
    name: string;
  }[] = [];

  public defaultAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null
  };

  public newAttribute: APIAttrAttribute = {
    id: null,
    type_id: null,
    name: null,
    description: null,
    precision: null,
    unit_id: null,
    is_multiple: false,
    parent_id: null
  };

  public listOptions: APIAttrListOption[] = [];

  public listOptionsDefaults = [{ id: null, name: '-' }];
  public listOptionsOptions: {
    id: number | null;
    name: string;
  }[] = [];
  public newListOption = {
    parent_id: null,
    name: ''
  };
  private $listOptionsChange = new BehaviorSubject<null>(null);
  private unitsSub: Subscription;

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

  ngOnInit(): void {
    this.unitsSub = this.attrsService.getUnits().subscribe(
      items => {
        this.unitOptions = this.unitOptionsDefaults.slice(0);
        for (const item of items) {
          this.unitOptions.push({
            id: item.id,
            name: getUnitTranslation(item.id, 'name')
          });
        }
      },
      response => this.toastService.response(response)
    );

    this.routeSub = combineLatest([
      this.route.paramMap.pipe(
        map(params => parseInt(params.get('id'), 10)),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(10)
      ),
      this.attrsService.getAttributeTypes()
    ])
      .pipe(
        switchMap(([id, types]) => this.attrsService.getAttribute(id).pipe(
          map(attribute => ({ attribute, types }))
        )),
        switchMap(data => combineLatest([
          of(data.attribute),
          of(data.types),
          this.api.request<APIAttrAttributeGetResponse>('GET', 'attr/attribute', {
            params: {
              parent_id: data.attribute.id.toString(),
              recursive: '0',
              fields: 'unit'
            }
          }),
          this.$listOptionsChange.pipe(
            switchMap(() =>
              this.attrsService.getListOptions({
                attribute_id: data.attribute.id
              })
            )
          )
        ]))
      )
      .subscribe(([attribute, types, attributes, listOptions]) => {

        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: attribute.name,
          pageId: 101
        });

        this.attribute = attribute;
        this.typeOptions = this.typeOptionsDefaults.slice(0);
        for (const item of types) {
          this.typeMap[item.id] = item.name;
          this.typeOptions.push({
            id: item.id,
            name: getAttrListOptionsTranslation(item.name)
          });
        }

        this.prepareListOptionsOptions(listOptions.items);

        this.attributes = attributes.items;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.unitsSub.unsubscribe();
  }

  public saveAttribute() {
    this.loading++;
    this.attrsService
      .updateAttribute(this.attribute.id, this.attribute)
      .subscribe(
        () => {
          this.loading--;
        },
        response => {
          this.toastService.response(response);
          this.loading--;
        }
      );
  }

  public addAttribute() {
    this.newAttribute.parent_id = this.attribute.id;

    this.addLoading++;
    this.attrsService.createAttribute(this.newAttribute).subscribe(
      response => {
        const location = response.headers.get('Location');

        Object.assign(this.newAttribute, this.defaultAttribute);

        this.addLoading++;
        this.attrsService.getAttributeByLocation(location).subscribe(
          subresponse => {
            this.router.navigate(['/moder/attrs/attribute', subresponse.id]);

            this.addLoading--;
          },
          subresponse => {
            this.toastService.response(subresponse);
            this.addLoading--;
          }
        );

        this.addLoading--;
      },
      response => {
        this.toastService.response(response);
        this.addLoading--;
      }
    );
  }

  public addListOption() {
    this.addListOptionLoading++;

    this.attrsService
      .createListOption({
        attribute_id: this.attribute.id,
        parent_id: this.newListOption.parent_id,
        name: this.newListOption.name
      })
      .subscribe(
        () => {
          this.newListOption.name = '';

          this.$listOptionsChange.next(null);

          this.addListOptionLoading--;
        },
        response => {
          this.toastService.response(response);
          this.addListOptionLoading--;
        }
      );

    return false;
  }

  private prepareListOptionsOptions(listOptions: APIAttrListOption[]) {
    this.listOptions = listOptions;
    const options = this.listOptionsDefaults.slice(0);
    for (const item of listOptions) {
      options.push({
        id: item.id,
        name: item.name
      });
    }

    this.listOptionsOptions = options;
  }

  public getUnitTranslation(id: number, type: string): string {
    return getUnitTranslation(id, type);
  }

  public getAttrsTranslation(id: string): string {
    return getAttrsTranslation(id);
  }
}
