import {Component, Input} from '@angular/core';
import {APITopFactoriesListItem, NewItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-index-factories-factory',
  styleUrls: ['./factory.component.scss'],
  templateUrl: './factory.component.html',
})
export class IndexFactoriesFactoryComponent {
  @Input() set factory(factory: APITopFactoriesListItem) {
    this.factory$.next(factory);
  }
  protected readonly factory$ = new BehaviorSubject<APITopFactoriesListItem | null>(null);

  protected readonly response$ = this.factory$.pipe(
    switchMap((factory) =>
      factory
        ? this.itemsClient.getNewItems(
            new NewItemsRequest({
              itemId: '' + factory.id,
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
