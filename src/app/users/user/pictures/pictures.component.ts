import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {EMPTY, Observable} from 'rxjs';
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
    shareReplay(1)
  );

  protected readonly user$ = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity$(identity, {fields: 'identity'})),
    map((user) => ({
      id: user.id,
      identity: user.identity ? user.identity : 'user' + user.id,
      name: user.name,
    })),
    shareReplay(1)
  );

  protected readonly brands$: Observable<APIItem[]> = this.user$.pipe(
    switchMap((user) =>
      this.itemService.getItems$({
        descendant_pictures: {
          owner_id: user.id,
          status: 'accepted',
        },
        fields: 'name_only,catname,current_pictures_count',
        limit: 3000,
        order: 'name_nat',
        type_id: ItemType.ITEM_TYPE_BRAND,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((brands) => brands.items)
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly grpc: AutowpClient,
    private readonly toastService: ToastsService
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
