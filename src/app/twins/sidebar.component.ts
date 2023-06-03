import {Component, Input} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {APITwinsBrandsList, APITwinsBrandsListItem, GetTwinsBrandsListRequest} from '@grpc/spec.pb';
import {LanguageService} from '@services/language';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-twins-sidebar',
  templateUrl: './sidebar.component.html',
})
export class TwinsSidebarComponent {
  @Input() selected: string[] = [];

  protected readonly brands$: Observable<APITwinsBrandsList> = this.itemsClient.getTwinsBrandsList(
    new GetTwinsBrandsListRequest({language: this.languageService.language})
  );

  constructor(private readonly itemsClient: ItemsClient, private readonly languageService: LanguageService) {}

  protected active(item: APITwinsBrandsListItem): boolean {
    return this.selected.indexOf(item.catname) !== -1;
  }
}
