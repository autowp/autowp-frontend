import { Component} from '@angular/core';
import { ItemService} from '../../../../services/item';
import { UserService} from '../../../../services/user';
import { Router, ActivatedRoute} from '@angular/router';
import {combineLatest, EMPTY, of} from 'rxjs';
import { PictureService} from '../../../../services/picture';
import { PageEnvService } from '../../../../services/page-env.service';
import {debounceTime, distinctUntilChanged, switchMap, tap, map, catchError, shareReplay} from 'rxjs/operators';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-users-user-pictures-brand',
  templateUrl: './brand.component.html'
})
export class UsersUserPicturesBrandComponent {

  public user$ = this.route.paramMap.pipe(
    map(params => params.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(identity => this.userService.getByIdentity(identity, {fields: 'identity'})),
    switchMap(user => {
      if (!user || user.deleted) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(user);
    }),
    shareReplay(1)
  );

  public brand$ = this.route.paramMap.pipe(
    map(params => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(brandCatname => this.itemService.getItems({
      type_id: 5,
      limit: 1,
      catname: brandCatname,
      fields: 'name_only,catname'
    }).pipe(
      map(response => (response.items.length ? response.items[0] : null))
    )),
    tap(brand => {
      if (! brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return;
      }

      this.pageEnv.set({
        title: $localize `${brand.name_only} pictures`,
        pageId: 141
      });
    }),
    shareReplay(1)
  );

  public data$ = combineLatest([
    this.user$,
    this.brand$,
    this.route.queryParamMap.pipe(
      map(params => parseInt(params.get('page'), 10)),
      distinctUntilChanged(),
      debounceTime(10)
    )
  ]).pipe(
    switchMap(([user, brand, page]) => this.pictureService.getPictures({
      status: 'accepted',
      fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
      limit: 30,
      page,
      item_id: brand.id,
      owner_id: user.id.toString(),
      order: 1
    })),
    catchError(response => {
      this.toastService.response(response)
      return EMPTY;
    })
  );

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
