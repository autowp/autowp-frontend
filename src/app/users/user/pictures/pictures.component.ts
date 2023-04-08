import {Component, OnInit} from '@angular/core';
import {ItemService, APIItem} from '@services/item';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@services/user';
import {EMPTY, Observable} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../../toasts/toasts.service';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {ItemType} from '@grpc/spec.pb';

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
  public icons$ = this.grpc.getBrandIcons(new Empty()).pipe(
    tap((icons) => {
      addCSS(icons.css);
    }),
    shareReplay(1)
  );

  public user$ = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity$(identity, {fields: 'identity'})),
    map((user) => ({
      id: user.id,
      name: user.name,
      identity: user.identity ? user.identity : 'user' + user.id,
    })),
    shareReplay(1)
  );

  public brands$: Observable<APIItem[]> = this.user$.pipe(
    switchMap((user) =>
      this.itemService.getItems$({
        type_id: ItemType.ITEM_TYPE_BRAND,
        limit: 3000,
        order: 'name_nat',
        fields: 'name_only,catname,current_pictures_count',
        descendant_pictures: {
          status: 'accepted',
          owner_id: user.id,
        },
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((brands) => brands.items)
  );

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private grpc: AutowpClient,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({pageId: 63});
    }, 0);
  }

  public cssClass(item: APIItem) {
    return item.catname.replace(/\./g, '_');
  }
}
