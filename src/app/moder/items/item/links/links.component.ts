import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {APIItem} from '../../../../services/item';
import {ACLService, Privilege, Resource} from '../../../../services/acl.service';
import {APIItemLink, ItemLinkService} from '../../../../services/item-link';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {APIService} from '../../../../services/api.service';

@Component({
  selector: 'app-moder-items-item-links',
  templateUrl: './links.component.html'
})
export class ModerItemsItemLinksComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() item: APIItem;

  public loading = 0;

  public canEditMeta = false;

  public links: APIItemLink[];
  public newLink = {
    name: '',
    url: '',
    type_id: 'default'
  };
  private aclSub: Subscription;

  constructor(
    private acl: ACLService,
    private api: APIService,
    private itemLinkService: ItemLinkService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .isAllowed(Resource.CAR, Privilege.EDIT_META)
      .subscribe(allow => (this.canEditMeta = allow));
  }

  ngOnDestroy(): void {
    this.aclSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.loadLinks();
    }
  }

  private loadLinks() {
    this.loading++;
    this.itemLinkService
      .getItems({
        item_id: this.item.id
      })
      .subscribe(
        response => {
          this.links = response.items;
          this.loading--;
        },
        () => {
          this.loading--;
        }
      );
  }

  public saveLinks() {
    const promises: Observable<void>[] = [];

    if (this.newLink.url) {
      promises.push(
        this.api
          .request<void>('POST', 'item-link', {body: {
            item_id: this.item.id,
            name: this.newLink.name,
            url: this.newLink.url,
            type_id: this.newLink.type_id
          }})
          .pipe(
            tap(() => {
              this.newLink.name = '';
              this.newLink.url = '';
              this.newLink.type_id = 'default';
            })
          )
      );
    }

    for (const link of this.links) {
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

    this.loading++;
    forkJoin(promises).subscribe(
      () => this.loadLinks(),
      () => {},
      () => this.loading--
    );
  }
}
