import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {UserService} from '@services/user';
import {EMPTY, Observable, combineLatest, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-users-user-pictures-brand',
  templateUrl: './brand.component.html',
})
export class UsersUserPicturesBrandComponent {
  protected readonly user$ = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity$(identity, {fields: 'identity'})),
    switchMap((user) => {
      if (!user || user.deleted) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(user);
    }),
    shareReplay(1),
  );

  private readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) =>
      this.itemsClient
        .list(
          new ListItemsRequest({
            catname,
            fields: new ItemFields({
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
        )
        .pipe(map((response) => (response.items.length ? response.items[0] : null))),
    ),
    tap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return;
      }

      this.pageEnv.set({
        pageId: 141,
        title: $localize`${brand.nameOnly} pictures`,
      });
    }),
    shareReplay(1),
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.nameOnly} pictures`));

  protected readonly data$ = combineLatest([
    this.user$,
    this.brand$,
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page'), 10)),
      distinctUntilChanged(),
      debounceTime(10),
    ),
  ]).pipe(
    switchMap(([user, brand, page]) =>
      this.pictureService.getPictures$({
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        item_id: +brand.id,
        limit: 30,
        order: 1,
        owner_id: user.id.toString(),
        page,
        status: 'accepted',
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
  ) {}
}
