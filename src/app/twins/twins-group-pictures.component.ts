import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../services/item';
import {of, Subscription} from 'rxjs';
import {PageEnvService} from '../services/page-env.service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ACLService, Privilege, Resource} from '../services/acl.service';
import {APIPicture, PictureService} from '../services/picture';
import {APIPaginator} from '../services/api.service';
import {ToastsService} from '../toasts/toasts.service';

@Component({
  selector: 'app-twins-group-pictures',
  templateUrl: './twins-group-pictures.component.html'
})
@Injectable()
export class TwinsGroupPicturesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public canEdit = false;
  public selectedBrands: string[] = [];
  public pictures: APIPicture[] = [];
  public paginator: APIPaginator;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private pictureService: PictureService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    this.acl
      .isAllowed(Resource.CAR, Privilege.EDIT)
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.paramMap
      .pipe(
        map(params => parseInt(params.get('group'), 10)),
        distinctUntilChanged(),
        debounceTime(10),
        switchMap(group => {
          if (!group) {
            return of(null);
          }
          return this.itemService.getItem(group, {
            fields: 'name_text,name_html,childs.brands'
          });
        }),
        switchMap(group => this.route.queryParamMap.pipe(
          map(params => ({ group, page: parseInt(params.get('page'), 10) }))
        )),
        switchMap(data => this.pictureService.getPictures({
          status: 'accepted',
          item_id: data.group.id,
          fields:
            'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
          limit: 24,
          order: 16,
          page: data.page
        }).pipe(
          catchError(err => {
            this.toastService.response(err);
            return of(null);
          }),
          map(response => ({
            group: data.group,
            pictures: response.pictures,
            paginator: response.paginator
          }))
        ))
      )
      .subscribe(data => {
        this.group = data.group;
        this.pictures = data.pictures;
        this.paginator = data.paginator;

        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              nameTranslated: $localize `All pictures of ${data.group.name_text}`,
              pageId: 28
            }),
          0
        );

        const result = [];
        for (const item of data.group.childs) {
          for (const brand of item.brands) {
            result.push(brand.catname);
          }
        }

        this.selectedBrands = result;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
