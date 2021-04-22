import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../../../services/api.service';
import { ItemService, APIItem } from '../../../../services/item';
import { UserService, APIUser } from '../../../../services/user';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { PictureService, APIPicture } from '../../../../services/picture';
import { PageEnvService } from '../../../../services/page-env.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  map
} from 'rxjs/operators';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-users-user-pictures-brand',
  templateUrl: './brand.component.html'
})
export class UsersUserPicturesBrandComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public pictures: APIPicture[];
  public paginator: APIPaginator;
  public brand: APIItem;
  public user: APIUser;

  constructor(
    private itemService: ItemService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.routeSub = combineLatest([
      this.route.paramMap.pipe(
        map(params => ({
          identity: params.get('identity'),
          brand: params.get('brand'),
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(30),
        switchMap(params => {
          return combineLatest([
            this.userService.getByIdentity(params.identity, {
              fields: 'identity'
            }),
            this.itemService
              .getItems({
                type_id: 5,
                limit: 1,
                catname: params.brand,
                fields: 'name_only,catname'
              })
              .pipe(
                map(
                  response => (response.items.length ? response.items[0] : null)
                )
              )
          ]);
        }),
        map(([user, brand]) => ({user, brand})),
        tap(data => {
          if (! data.user || ! data.brand || data.user.deleted) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return;
          }

          this.brand = data.brand;
          this.user = data.user;

          this.pageEnv.set({
            layout: {
              needRight: false
            },
            nameTranslated: $localize `${data.brand.name_only} pictures`,
            pageId: 141
          });
        })
      ),
      this.route.queryParamMap.pipe(
        map(params => parseInt(params.get('page'), 10)),
        distinctUntilChanged(),
        debounceTime(30)
      )
    ])
      .pipe(
        switchMap(([route, page]) =>
          this.pictureService.getPictures({
            status: 'accepted',
            fields:
              'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
            limit: 30,
            page,
            item_id: route.brand.id,
            owner_id: route.user.id,
            order: 1
          })
        )
      )
      .subscribe(
        response => {
          this.pictures = response.pictures;
          this.paginator = response.paginator;
        },
        subresponse => this.toastService.response(subresponse)
      );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
