import {Component, Input} from '@angular/core';
import {BrandIcons, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIBrandsBrand} from '@services/brands.service';
import {LanguageService} from '@services/language';
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

  protected readonly response$ = this.brand$.pipe(
    switchMap((brand) =>
      brand
        ? this.itemsClient.getBrandNewItems(
            new NewItemsRequest({
              itemId: '' + brand.id,
              language: this.languageService.language,
            }),
          )
        : EMPTY,
    ),
  );

  constructor(
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  protected cssClass(item: APIBrandsBrand): string {
    return item.catname.replace(/\./g, '_');
  }
}
