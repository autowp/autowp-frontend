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
import { switchMap, tap } from 'rxjs/operators';
import { APIUser } from '../../services/user';
import { AuthService } from '../../services/auth.service';
import { APICommentsService } from '../../api/comments/comments.service';

@Component({
  selector: 'app-twins-group-picture',
  templateUrl: './twins-group-picture.component.html',
  styleUrls: ['./twins-group-picture.component.scss']
})
@Injectable()
export class TwinsGroupPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public canEdit = false;
  public canEditSpecs = false;
  public selectedBrands: string[] = [];
  public picture: APIPicture;
  public paginator: APIPaginator;
  public isModer = false;
  public user: APIUser;
  public currentURL: string;
  public showShareDialog = false;
  public location;

  public engines: APIItem[] = [];

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private pictureService: PictureService,
    private auth: AuthService,
    private router: Router,
    private commentsService: APICommentsService
  ) {}

  ngOnInit(): void {

    this.location = location;

    this.acl
      .isAllowed('twins', 'edit')
      .subscribe(canEdit => (this.canEdit = canEdit));

    this.acl
      .inheritsRole('moder')
      .subscribe(isModer => (this.isModer = isModer));

    this.acl
      .isAllowed('specifications', 'edit')
      .subscribe(canEditSpecs => (this.canEditSpecs = canEditSpecs));

    this.sub = combineLatest(
      this.route.paramMap,
      this.auth.getUser().pipe(tap(user => (this.user = user))),
      this.acl.isAllowed('specifications', 'edit'),
      (route, user, isModer) => ({ route, isModer })
    )
      .pipe(
        switchMap(
          data => {
            const groupID = parseInt(data.route.get('group'), 10);
            if (!groupID) {
              return of(null as APIItem);
            }
            return this.itemService.getItem(groupID, {
              fields: 'name_text,name_html,childs.brands.catname'
            });
          },
          (data, group) => ({
            group: group,
            route: data.route,
            isModer: data.isModer
          })
        ),
        switchMap(
          data => {
            if (!data.group) {
              return of(null as APIPictureGetResponse);
            }

            const identity = data.route.get('identity');
            if (!identity) {
              return of(null as APIPictureGetResponse);
            }

            let fields =
              'owner,name_html,name_text,image,preview_large,add_date,dpi,point,' +
              'items.item.design,items.item.description,items.item.specs_url,items.item.has_specs,items.item.alt_names,' +
              'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
              'twins.name_html,factories.name_html,moder_votes,votes,of_links,replaceable.url,replaceable.name_html';

            if (data.isModer) {
              fields += ',items.item.brands.name_html';
            }

            return this.pictureService.getPictures({
              identity: identity,
              // status: 'accepted',
              item_id: data.group.id,
              fields: fields,
              limit: 1,
              items: {
                type_id: 1
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
      .subscribe(data => {
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

  public pictureVoted() {}

  public vote(value) {
    this.pictureService.vote(this.picture.id, value).subscribe(votes => {
      this.picture.votes = votes;
    });
    return false;
  }

  public setSubscribed(value: boolean) {
    this.commentsService
      .setSubscribed(this.picture.id, 1, value)
      .subscribe(() => {
        this.picture.subscribed = value;
      });
  }

  public toggleShareDialog(): false {
    this.showShareDialog = ! this.showShareDialog;
    return false;
  }
}
