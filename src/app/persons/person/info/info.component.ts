import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {APIPictureGetResponse, PictureService} from '@services/picture';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../../toasts/toasts.service';
import {APIGetItemLinksRequest, APIItemLink, APIItemLinksResponse, ItemType} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';

@Component({
  selector: 'app-persons-person-info',
  templateUrl: './info.component.html',
})
export class PersonsPersonInfoComponent {
  public isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page'), 10)),
    distinctUntilChanged(),
    debounceTime(10)
  );

  private itemID$ = this.route.parent.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'description'].join(','),
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (item.item_type_id !== ItemType.ITEM_TYPE_PERSON) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        title: item.name_text,
        pageId: 213,
      });
    }),
    shareReplay(1)
  );

  public links$: Observable<APIItemLink[]> = this.itemID$.pipe(
    switchMap((itemID) => this.itemsClient.getItemLinks(new APIGetItemLinksRequest({itemId: '' + itemID}))),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of({items: []} as APIItemLinksResponse);
    }),
    map((response) => response.items)
  );

  public authorPictures$ = combineLatest([this.itemID$, this.page$]).pipe(
    switchMap(([itemID, page]) =>
      this.pictureService.getPictures$({
        status: 'accepted',
        exact_item_id: itemID,
        exact_item_link_type: 2,
        fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
        limit: 12,
        order: 12,
        page,
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return of(null as APIPictureGetResponse);
    })
  );

  public contentPictures$ = combineLatest([this.itemID$, this.page$]).pipe(
    switchMap(([itemID, page]) =>
      this.pictureService
        .getPictures$({
          status: 'accepted',
          exact_item_id: itemID,
          exact_item_link_type: 1,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 12,
          order: 12,
          page,
        })
        .pipe(
          catchError((err: unknown) => {
            this.toastService.handleError(err);
            return of(null as APIPictureGetResponse);
          })
        )
    )
  );

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private itemsClient: ItemsClient,
    private acl: ACLService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
