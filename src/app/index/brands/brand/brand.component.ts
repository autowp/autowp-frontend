import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APITopBrandsListItem, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  imports: [RouterLink, NgbPopover, AsyncPipe, NgIf],
  selector: 'app-index-brands-brand',
  styleUrls: ['./brand.component.scss'],
  templateUrl: './brand.component.html',
})
export class IndexBrandsBrandComponent {
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  @Input() set brand(item: APITopBrandsListItem) {
    this.brand$.next(item);
  }
  protected readonly brand$: BehaviorSubject<APITopBrandsListItem | null> =
    new BehaviorSubject<APITopBrandsListItem | null>(null);

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
}
