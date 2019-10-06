import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, of, combineLatest } from 'rxjs';
import { APIItem, ItemService } from '../../services/item';
import {
  APIPicture,
  PictureService,
  APIPictureGetResponse
} from '../../services/picture';
import { APIPaginator } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { ACLService } from '../../services/acl.service';
import {
  switchMap,
  tap,
  distinctUntilChanged,
  map,
  switchMapTo
} from 'rxjs/operators';
import { APIUser } from '../../services/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-twins-group-picture',
  templateUrl: './twins-group-picture.component.html'
})
@Injectable()
export class TwinsGroupPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public canEdit = false;
  public selectedBrands: string[] = [];
  public picture: APIPicture;
  public paginator: APIPaginator;
  public user: APIUser;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private pictureService: PictureService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acl
      .isAllowed('twins', 'edit')
      .subscribe((canEdit) => (this.canEdit = canEdit));

    const groupPipe = this.route.paramMap.pipe(
      map((route) => parseInt(route.get('group'), 10)),
      distinctUntilChanged(),
      switchMap((groupID) => {
        if (!groupID) {
          return of(null as APIItem);
        }
        return this.itemService.getItem(groupID, {
          fields: 'name_text,name_html,childs.brands.catname'
        });
      })
    );

    const identityPipe = this.route.paramMap.pipe(
      map((route) => route.get('identity')),
      distinctUntilChanged()
    );

    this.sub = combineLatest([
      groupPipe,
      this.auth.getUser().pipe(tap((user) => (this.user = user))),
      this.acl.isAllowed('specifications', 'edit')
    ])
      .pipe(
        map(data => ({ group: data[0], isModer: data[2] })),
        switchMapTo(identityPipe, (data, identity) => ({
          group: data.group,
          isModer: data.isModer,
          identity: identity
        })),
        switchMap(
          (data) => {
            if (!data.group) {
              return of(null as APIPictureGetResponse);
            }

            if (!data.identity) {
              return of(null as APIPictureGetResponse);
            }

            let fields =
              'owner,name_html,name_text,image,preview_large,add_date,dpi,point,paginator,' +
              'items.item.design,items.item.description,items.item.specs_url,items.item.has_specs,items.item.alt_names,' +
              'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
              'factories.name_html,moder_votes,votes,of_links,replaceable.url,replaceable.name_html';

            if (data.isModer) {
              fields += ',items.item.brands.name_html';
            }

            return this.pictureService.getPictures({
              identity: data.identity,
              // status: 'accepted',
              item_id: data.group.id,
              fields: fields,
              limit: 1,
              items: {
                type_id: 1
              },
              paginator: {
                item_id: data.group.id
              }
            });
          },
          (data, response) => ({
            group: data.group,
            picture:
              response && response.pictures.length ? response.pictures[0] : null
          })
        )
      )
      .subscribe((data) => {
        if (!data.picture || !data.group) {
          this.router.navigate(['/error-404']);
          return;
        }

        this.group = data.group;
        this.picture = data.picture;

        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false
              },
              nameTranslated: data.picture.name_text,
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
