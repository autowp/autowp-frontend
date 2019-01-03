import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { ItemService, APIItem } from '../services/item';
import { Subscription, of } from 'rxjs';
import { PageEnvService } from '../services/page-env.service';
import { switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ACLService } from '../services/acl.service';
import { PictureService, APIPicture } from '../services/picture';
import Notify from '../notify';
import { APIPaginator } from '../services/api.service';

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
    private pictureService: PictureService
  ) {}

  ngOnInit(): void {
    this.acl
      .isAllowed('twins', 'edit')
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.sub = this.route.params
      .pipe(
        switchMap(route => {
          if (!route.group) {
            return of(null);
          }
          return this.itemService.getItem(route.group, {
            fields: 'name_text,name_html,childs.brands.catname'
          });
        }),
        switchMap(
          () => this.route.queryParams,
          (group, params) => ({ group, params })
        ),
        switchMap(
          data => {
            return this.pictureService
              .getPictures({
                status: 'accepted',
                item_id: data.group.id,
                fields:
                  'owner,thumb_medium,votes,views,comments_count,name_html,name_text',
                limit: 24,
                order: 12,
                page: data.params.page
              })
              .pipe(
                catchError(err => {
                  Notify.response(err);
                  return of(null);
                })
              );
          },
          (data, response) => ({
            group: data.group,
            pictures: response.pictures,
            paginator: response.paginator
          })
        )
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
              name: 'page/28/name',
              pageId: 28,
              args: { group_name: data.group.name_text }
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
