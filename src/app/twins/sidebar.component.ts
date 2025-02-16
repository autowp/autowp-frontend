import {AsyncPipe} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {APITwinsBrandsList, APITwinsBrandsListItem, GetTwinsBrandsListRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {Observable} from 'rxjs';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'app-twins-sidebar',
  templateUrl: './sidebar.component.html',
})
export class TwinsSidebarComponent {
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() selected: string[] = [];

  protected readonly brands$: Observable<APITwinsBrandsList> = this.#itemsClient.getTwinsBrandsList(
    new GetTwinsBrandsListRequest({language: this.#languageService.language}),
  );

  protected active(item: APITwinsBrandsListItem): boolean {
    return this.selected.indexOf(item.catname) !== -1;
  }
}
