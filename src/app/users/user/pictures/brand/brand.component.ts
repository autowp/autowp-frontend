import {Component} from '@angular/core';
import {ItemService} from '@services/item';
import {UserService} from '@services/user';
import {Router, ActivatedRoute} from '@angular/router';
import {combineLatest, EMPTY, of} from 'rxjs';
import {PictureService} from '@services/picture';
import {PageEnvService} from '@services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, tap, map, catchError, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../../../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

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
    shareReplay(1)
  );

  private readonly brand$ = this.route.paramMap.pipe(
    map((params) => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((brandCatname) =>
      this.itemService
        .getItems$({
          type_id: ItemType.ITEM_TYPE_BRAND,
          limit: 1,
          catname: brandCatname,
          fields: 'name_only,catname',
        })
        .pipe(map((response) => (response.items.length ? response.items[0] : null)))
    ),
    tap((brand) => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return;
      }

      this.pageEnv.set({
        title: $localize`${brand.name_only} pictures`,
        pageId: 141,
      });
    }),
    shareReplay(1)
  );

  protected readonly title$ = this.brand$.pipe(map((brand) => $localize`${brand.name_only} pictures`));

  protected readonly data$ = combineLatest([
    this.user$,
    this.brand$,
    this.route.queryParamMap.pipe(
      map((params) => parseInt(params.get('page'), 10)),
      distinctUntilChanged(),
      debounceTime(10)
    ),
  ]).pipe(
    switchMap(([user, brand, page]) =>
      this.pictureService.getPictures$({
        status: 'accepted',
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 30,
        page,
        item_id: brand.id,
        owner_id: user.id.toString(),
        order: 1,
      })
    ),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}
}
