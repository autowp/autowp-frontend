import {AsyncPipe} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {APITopFactoriesListItem, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  imports: [RouterLink, NgbPopover, AsyncPipe],
  selector: 'app-index-factories-factory',
  styleUrls: ['./factory.component.scss'],
  templateUrl: './factory.component.html',
})
export class IndexFactoriesFactoryComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  readonly factory = input.required<APITopFactoriesListItem>();
  protected readonly factory$ = toObservable(this.factory);

  protected readonly response$ = this.factory$.pipe(
    switchMap((factory) =>
      factory
        ? this.#itemsClient.getNewItems(
            new NewItemsRequest({
              itemId: '' + factory.id,
              language: this.#languageService.language,
            }),
          )
        : EMPTY,
    ),
  );
}
