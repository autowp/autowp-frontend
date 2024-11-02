import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {APIItem, APIUser, ItemFields, ItemListOptions, ItemType, ListItemsRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureService} from '@services/picture';
import {UserService} from '@services/user';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  imports: [RouterLink, ThumbnailComponent, PaginatorComponent, AsyncPipe],
  selector: 'app-users-user-pictures-brand',
  standalone: true,
  templateUrl: './brand.component.html',
})
export class UsersUserPicturesBrandComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly user$: Observable<APIUser> = this.route.paramMap.pipe(
    map((params) => params.get('identity')),
    switchMap((identity) => (identity ? of(identity) : EMPTY)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((identity) => this.userService.getByIdentity$(identity, undefined)),
    switchMap((user) => {
      if (!user || user.deleted) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(user);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => params.get('brand') ?? ''),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((catname) =>
      this.itemsClient
        .list(
          new ListItemsRequest({
            fields: new ItemFields({
              nameOnly: true,
            }),
            language: this.languageService.language,
            limit: 1,
            options: new ItemListOptions({
              catname,
              typeId: ItemType.ITEM_TYPE_BRAND,
            }),
          }),
        )
        .pipe(map((response) => (response.items?.length ? response.items[0] : null))),
    ),
    switchMap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      this.pageEnv.set({
        pageId: 141,
        title: $localize`${brand.nameOnly} pictures`,
      });

      return of(brand);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.nameOnly} pictures`));

  protected readonly data$ = combineLatest([
    this.user$,
    this.brand$,
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') ?? '', 10)),
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
        owner_id: user.id,
        page,
        status: 'accepted',
      }),
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
  );
}
