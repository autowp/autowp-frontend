import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  APIItem,
  ItemFields,
  ItemPicturesRequest,
  ItemType,
  ListItemsRequest,
  PicturesRequest,
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

function addCSS(url: string) {
  const cssId = 'brands-css';
  if (!document.getElementById(cssId)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
  }
}

@Component({
  selector: 'app-users-user-pictures',
  templateUrl: './pictures.component.html',
})
export class UsersUserPicturesComponent implements OnInit {
  protected readonly icons$ = this.grpc.getBrandIcons(new Empty()).pipe(
    tap((icons) => {
      addCSS(icons.css);
    }),
    shareReplay(1),
  );

  private readonly userId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('identity') || ''),
    distinctUntilChanged(),
    debounceTime(10),
    shareReplay(1),
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
    shareReplay(1),
  );

  protected readonly brands$: Observable<APIItem[]> = this.user$.pipe(
    switchMap((user) =>
      this.itemsClient.list(
        new ListItemsRequest({
          descendantPictures: new ItemPicturesRequest({
            pictures: new PicturesRequest({
              ownerId: '' + user.id,
              status: PictureStatus.PICTURE_STATUS_ACCEPTED,
            }),
          }),
          fields: new ItemFields({
            currentPicturesCount: true,
            nameOnly: true,
          }),
          language: this.languageService.language,
          limit: 3000,
          order: ListItemsRequest.Order.NAME_NAT,
          typeId: ItemType.ITEM_TYPE_BRAND,
        }),
      ),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((brands) => (brands.items ? brands.items : [])),
  );

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly grpc: AutowpClient,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 63});
    }, 0);
  }

  protected cssClass(item: APIItem) {
    return item.catname.replace(/\./g, '_');
  }
}
