import {Component, Input} from '@angular/core';
import {APIGetItemLinksRequest, APIItemLink, APIItemLinkRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem} from '@services/item';
import {BehaviorSubject, Observable, forkJoin, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-links',
  templateUrl: './links.component.html',
})
export class ModerItemsItemLinksComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  protected readonly item$ = new BehaviorSubject<APIItem>(null);
  private readonly reload$ = new BehaviorSubject<null>(null);

  protected loadingNumber = 0;

  protected readonly canEditMeta$ = this.acl.isAllowed$(Resource.CAR, Privilege.EDIT_META);

  protected readonly newLink = {
    name: '',
    type: 'default',
    url: '',
  };

  protected readonly links$: Observable<APIItemLink[]> = this.reload$.pipe(
    switchMap(() => this.item$),
    switchMap((item) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + item.id}))),
    map((response) => response.items)
  );

  constructor(
    private readonly acl: ACLService,
    private readonly itemsClient: ItemsClient,
    private readonly toastService: ToastsService
  ) {}

  protected saveLinks(itemId: number, links: APIItemLink[]) {
    const promises: Observable<null>[] = [];

    if (this.newLink.url) {
      promises.push(
        this.itemsClient
          .createItemLink(
            new APIItemLink({
              itemId: '' + itemId,
              name: this.newLink.name,
              type: this.newLink.type,
              url: this.newLink.url,
            })
          )
          .pipe(
            catchError((response: unknown) => {
              this.toastService.handleError(response);
              return of(null);
            }),
            tap((response) => {
              if (response) {
                this.newLink.name = '';
                this.newLink.url = '';
                this.newLink.type = 'default';
              }
            }),
            map(() => null)
          )
      );
    }

    for (const link of links) {
      if (link.url) {
        promises.push(
          this.itemsClient
            .updateItemLink(
              new APIItemLink({
                id: link.id,
                itemId: '' + itemId,
                name: link.name,
                type: link.type,
                url: link.url,
              })
            )
            .pipe(
              catchError((response: unknown) => {
                this.toastService.handleError(response);
                return of(null);
              }),
              map(() => null)
            )
        );
      } else {
        promises.push(
          this.itemsClient.deleteItemLink(new APIItemLinkRequest({id: '' + link.id})).pipe(map(() => null))
        );
      }
    }

    this.loadingNumber++;
    forkJoin(promises).subscribe({
      complete: () => this.loadingNumber--,
      next: () => this.reload$.next(null),
    });
  }
}
