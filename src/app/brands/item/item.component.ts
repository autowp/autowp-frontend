import {Component, Input} from '@angular/core';
import {BrandIcons} from '@grpc/spec.pb';
import {APIService} from '@services/api.service';
import {APIBrandsBrand} from '@services/brands.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-brands-item',
  templateUrl: './item.component.html',
})
export class BrandsItemComponent {
  @Input() set brand(item: APIBrandsBrand) {
    this.brand$.next(item);
  }
  protected readonly brand$ = new BehaviorSubject<APIBrandsBrand | null>(null);

  @Input() icons?: BrandIcons;

  protected readonly html$ = this.brand$.pipe(
    switchMap((brand) =>
      brand
        ? this.api.request('GET', 'brands/' + brand.id + '/new-items', {
            observe: 'body',
            responseType: 'text',
          })
        : EMPTY,
    ),
  );

  constructor(private readonly api: APIService) {}

  protected cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }
}
