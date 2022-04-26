import {Component, Input} from '@angular/core';
import {APIItem} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIItemLink, ItemLinkService} from '../../../../services/item-link';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {APIService} from '../../../../services/api.service';

@Component({
  selector: 'app-moder-items-item-links',
  templateUrl: './links.component.html'
})
export class ModerItemsItemLinksComponent {
  @Input() set item(item: APIItem) { this.item$.next(item); };
  public item$ = new BehaviorSubject<APIItem>(null);
  private reload$ = new BehaviorSubject<null>(null);

  public loadingNumber = 0;

  public canEditMeta$ = this.acl.isAllowed(Resource.CAR, Privilege.EDIT_META);

  public newLink = {
    name: '',
    url: '',
    type_id: 'default'
  };

  public links$: Observable<APIItemLink[]> = this.reload$.pipe(
    switchMapTo(this.item$),
    switchMap(item => this.itemLinkService.getItems({item_id: item.id})),
    map(response => response.items)
  );

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemLinkService: ItemLinkService
  ) {}

  public saveLinks(itemId: number, links: APIItemLink[]) {
    const promises: Observable<void>[] = [];

    if (this.newLink.url) {
      promises.push(
        this.api.request<void>('POST', 'item-link', {body: {
          item_id: itemId,
          name: this.newLink.name,
          url: this.newLink.url,
          type_id: this.newLink.type_id
        }}).pipe(
          tap(() => {
            this.newLink.name = '';
            this.newLink.url = '';
            this.newLink.type_id = 'default';
          })
        )
      );
    }

    for (const link of links) {
      if (link.url) {
        promises.push(
          this.api.request<void>('PUT', 'item-link/' + link.id, {body: {
            name: link.name,
            url: link.url,
            type_id: link.type_id
          }})
        );
      } else {
        promises.push(this.api.request<void>('DELETE', 'item-link/' + link.id));
      }
    }

    this.loadingNumber++;
    forkJoin(promises).subscribe({
      next: () => this.reload$.next(null),
      complete: () => this.loadingNumber--
    });
  }
}
