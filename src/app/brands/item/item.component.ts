import {Component, Input} from '@angular/core';
import {APIBrandsBrand} from '@services/brands.service';
import {APIService} from '@services/api.service';
import {BrandIcons} from '@grpc/spec.pb';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-brands-item',
  templateUrl: './item.component.html',
})
export class BrandsItemComponent {
  @Input() set brand(item: APIBrandsBrand) {
    this.brand$.next(item);
  }
  protected readonly brand$ = new BehaviorSubject<APIBrandsBrand>(null);

  @Input() icons: BrandIcons;

  protected readonly html$ = this.brand$.pipe(
    switchMap((brand) =>
      this.api.request('GET', 'brands/' + brand.id + '/new-items', {
        responseType: 'text',
        observe: 'body',
      })
    )
  );

  constructor(private readonly api: APIService) {}

  protected cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }
}
