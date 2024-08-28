import {Component, Input} from '@angular/core';
import {NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APIBrandsBrand} from '@services/brands.service';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-index-brands-brand',
  styleUrls: ['./brand.component.scss'],
  templateUrl: './brand.component.html',
})
export class IndexBrandsBrandComponent {
  @Input() set brand(item: APIBrandsBrand) {
    this.brand$.next(item);
  }
  protected readonly brand$: BehaviorSubject<APIBrandsBrand | null> = new BehaviorSubject<APIBrandsBrand | null>(null);

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
}
