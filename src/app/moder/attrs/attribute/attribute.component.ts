import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { PageEnvService } from '../../../services/page-env.service';
import {map, switchMap} from 'rxjs/operators';
import { APIAttrAttribute, APIAttrListOption, APIAttrsService, APIAttrAttributeGetResponse } from '../../../api/attrs/attrs.service';
import {ToastsService} from '../../../toasts/toasts.service';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-moder-attrs-attribute',
  templateUrl: './attribute.component.html'
})
@Injectable()
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
            name: item.name
          });
        }
      },
      response => this.toastService.response(response)
    );

    this.routeSub = combineLatest([this.route.params, this.attrsService.getAttributeTypes()])
      .pipe(
        map(data => ({ params: data[0], types: data[1] })),
        switchMap(data => this.attrsService.getAttribute(data.params.id).pipe(
          map(attribute => ({ attribute: attribute, types: data.types }))
        )),
        switchMap(data => combineLatest([
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
        ]).pipe(
          map(combined => ({
            attribute: data.attribute,
            types: data.types,
            attributes: combined[0],
            listOptions: combined[1]
          }))
        ))
      )
      .subscribe(data => {

        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          name: data.attribute.name,
          pageId: 101
        });

        this.attribute = data.attribute;
        this.typeOptions = this.typeOptionsDefaults.slice(0);
        for (const item of data.types) {
          this.typeMap[item.id] = item.name;
          this.typeOptions.push({
            id: item.id,
            name: item.name
          });
        }

        this.prepareListOptionsOptions(data.listOptions.items);

        this.attributes = data.attributes.items;
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
}
