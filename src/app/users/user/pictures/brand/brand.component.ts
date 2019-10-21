import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
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
@Injectable()
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
      this.route.params.pipe(
        distinctUntilChanged(),
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
        map(data => ({
          user: data[0],
          brand: data[1]
        })),
        tap(data => {
          if (data.user.deleted) {
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
            name: 'page/141/ng-name',
            pageId: 141,
            args: {
              brand: data.brand.name_only
            }
          });
        })
      ),
      this.route.queryParams.pipe(
        distinctUntilChanged(),
        debounceTime(30)
      )
    ])
      .pipe(
        map(data => ({
          route: data[0],
          query: data[1]
        })),
        switchMap(data =>
          this.pictureService.getPictures({
            status: 'accepted',
            fields:
              'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
            limit: 30,
            page: data.query.page,
            item_id: data.route.brand.id,
            owner_id: data.route.user.id,
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
