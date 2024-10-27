import {AsyncPipe, DOCUMENT, NgClass, NgStyle} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemType,
  ListItemsRequest,
  PictureItemOptions,
  PicturesOptions,
  PictureStatus,
} from '@grpc/spec.pb';
import {AutowpClient, ItemsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, NgClass, NgStyle, AsyncPipe],
  selector: 'app-users-user-pictures',
  standalone: true,
  templateUrl: './pictures.component.html',
})
export class UsersUserPicturesComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly grpc = inject(AutowpClient);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  protected readonly icons$ = this.grpc.getBrandIcons(new Empty()).pipe(
    tap((icons) => {
      this.addCSS(icons.css);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly userId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('identity') || ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly user$ = this.userId$.pipe(
    switchMap((identity) => this.userService.getByIdentity$(identity, undefined)),
    switchMap((user) => {
      if (!user) {
        return EMPTY;
      }
      return of(user);
    }),
    map((user) => ({
      id: user.id,
      identity: user.identity ? user.identity : 'user' + user.id,
      name: user.name,
    })),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly brands$: Observable<APIItem[]> = this.user$.pipe(
    switchMap((user) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({
            descendantPicturesCount: true,
            nameOnly: true,
          }),
          language: this.languageService.language,
          limit: 3000,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemOptions({
                pictures: new PicturesOptions({
                  ownerId: '' + user.id,
                  status: PictureStatus.PICTURE_STATUS_ACCEPTED,
                }),
              }),
            }),
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
          order: ListItemsRequest.Order.NAME_NAT,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((brands) => (brands.items ? brands.items : [])),
  );

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 63});
    }, 0);
  }

  protected cssClass(item: APIItem) {
    return item.catname.replace(/\./g, '_');
  }

  private addCSS(url: string) {
    const cssId = 'brands-css';
    if (!this.document.getElementById(cssId)) {
      const head = this.document.getElementsByTagName('head')[0];
      const link = this.document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = url;
      link.media = 'all';
      head.appendChild(link);
    }
  }
}
