import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { APIPaginator } from '../../services/api.service';
import { ItemService, APIItem } from '../../services/item';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription, combineLatest, of, EMPTY, Observable} from 'rxjs';
import {PictureService, APIPicture, APIPictureGetResponse} from '../../services/picture';
import {ItemLinkService, APIItemLink, APIItemLinkGetResponse} from '../../services/item-link';
import { APIACL } from '../../services/acl.service';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  tap, map
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-persons-person',
  templateUrl: './person.component.html'
})
@Injectable()
export class PersonsPersonComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public links: APIItemLink[] = [];
  public authorPictures: APIPicture[] = [];
  public authorPicturesPaginator: APIPaginator;
  public contentPictures: APIPicture[] = [];
  public contentPicturesPaginator: APIPaginator;
  public item: APIItem;
  public isModer = false;
  private aclSub: Subscription;
  public routerLink: string[] = [];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private itemLinkService: ItemLinkService,
    private acl: APIACL,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.aclSub = this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    this.routeSub = this.getPerson().pipe(
      tap(item => {
        this.routerLink = ['/persons', item.id.toString()];

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: item.name_text,
          pageId: 213
        });
      }),
      switchMap(item => this.route.queryParams.pipe(
        map(params => ({ item, params }))
      )),
      switchMap(data => combineLatest([
        of(data.item),
        this.itemLinkService.getItems({item_id: data.item.id}).pipe(
          catchError(err => {
            this.toastService.response(err);
            return of(null as APIItemLinkGetResponse);
          })
        ),
        this.pictureService.getPictures({
          status: 'accepted',
          exact_item_id: data.item.id,
          exact_item_link_type: 2,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 12,
          order: 12,
          page: data.params.page
        }).pipe(
          catchError(err => {
            this.toastService.response(err);
            return of(null as APIPictureGetResponse);
          })
        ),
        this.pictureService.getPictures({
          status: 'accepted',
          exact_item_id: data.item.id,
          exact_item_link_type: 1,
          fields: 'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 12,
          order: 12,
          page: data.params.page
        }).pipe(
          catchError(err => {
            this.toastService.response(err);
            return of(null as APIPictureGetResponse);
          })
        )
      ])))
      .subscribe(([item, links, authorPictures, contentPictures]) => {
        this.item = item;
        this.links = links.items;
        this.authorPictures = authorPictures.pictures;
        this.authorPicturesPaginator = authorPictures.paginator;
        this.contentPictures = contentPictures.pictures;
        this.contentPicturesPaginator = contentPictures.paginator;
      });
  }

  getPerson(): Observable<APIItem> {
    return this.route.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      debounceTime(30),
      switchMap(id =>
        this.itemService.getItem(id, {
          fields: ['name_text', 'name_html', 'description'].join(',')
        })
      ),
      catchError(err => {
        this.toastService.response(err);
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }),
      switchMap(item => {
        if (item.item_type_id !== 8) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        return of(item);
      })
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.aclSub.unsubscribe();
  }
}
