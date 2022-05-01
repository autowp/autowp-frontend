import { Component, Input } from '@angular/core';
import { APIBrandsBrand } from '../../services/brands.service';
import { APIService } from '../../services/api.service';
import {BrandIcons} from '../../../../generated/spec.pb';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-brands-item',
  templateUrl: './item.component.html'
})
export class BrandsItemComponent {
  @Input() set brand(item: APIBrandsBrand) { this.brand$.next(item); };
  public brand$ = new BehaviorSubject<APIBrandsBrand>(null);

  @Input() icons: BrandIcons;

  public html$ = this.brand$.pipe(
    switchMap(brand => this.api.request('GET', 'brands/' + brand.id + '/new-items', {
      responseType: 'text',
      observe: 'body'
    }))
  );

  constructor(private api: APIService) {}

  public cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }
}
