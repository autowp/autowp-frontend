import {Component, Input} from '@angular/core';
import {APIItem} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ItemsClient} from '../../../../../../generated/spec.pbsc';
import {APIGetItemLinksRequest, APIItemLink, APIItemLinkRequest} from '../../../../../../generated/spec.pb';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-moder-items-item-links',
  templateUrl: './links.component.html',
})
export class ModerItemsItemLinksComponent {
  @Input() set item(item: APIItem) {
    this.item$.next(item);
  }
  public item$ = new BehaviorSubject<APIItem>(null);
  private reload$ = new BehaviorSubject<null>(null);

  public loadingNumber = 0;

  public canEditMeta$ = this.acl.isAllowed(Resource.CAR, Privilege.EDIT_META);

  public newLink = {
    name: '',
    url: '',
    type: 'default',
  };

  public links$: Observable<APIItemLink[]> = this.reload$.pipe(
    switchMap(() => this.item$),
    switchMap((item) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + item.id}))),
    map((response) => response.items)
  );

  constructor(private acl: ACLService, private itemsClient: ItemsClient, private toastService: ToastsService) {}

  public saveLinks(itemId: number, links: APIItemLink[]) {
    const promises: Observable<any>[] = [];

    if (this.newLink.url) {
      promises.push(
        this.itemsClient
          .createItemLink(
            new APIItemLink({
              itemId: '' + itemId,
              name: this.newLink.name,
              url: this.newLink.url,
              type: this.newLink.type,
            })
          )
          .pipe(
            catchError((response) => {
              this.toastService.grpcErrorResponse(response);
              return of(null);
            }),
            tap((response) => {
              if (response) {
                this.newLink.name = '';
                this.newLink.url = '';
                this.newLink.type = 'default';
              }
            })
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
                url: link.url,
                type: link.type,
              })
            )
            .pipe(
              catchError((response) => {
                this.toastService.grpcErrorResponse(response);
                return of(null);
              })
            )
        );
      } else {
        promises.push(this.itemsClient.deleteItemLink(new APIItemLinkRequest({id: '' + link.id})));
      }
    }

    this.loadingNumber++;
    forkJoin(promises).subscribe({
      next: () => this.reload$.next(null),
      complete: () => this.loadingNumber--,
    });
  }
}
