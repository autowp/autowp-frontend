import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APITopFactoriesListItem, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
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

  @Input() set factory(factory: APITopFactoriesListItem) {
    this.factory$.next(factory);
  }
  protected readonly factory$ = new BehaviorSubject<APITopFactoriesListItem | null>(null);

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
