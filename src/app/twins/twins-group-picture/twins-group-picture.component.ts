import {Component} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {APIItem, ItemService} from '../../services/item';
import {APIPicture, PictureService} from '../../services/picture';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '../../services/page-env.service';
import {ACLService, Privilege, Resource} from '../../services/acl.service';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-twins-group-picture',
  templateUrl: './twins-group-picture.component.html',
})
export class TwinsGroupPictureComponent {
  public user$ = this.auth.getUser$();
  private changed$ = new BehaviorSubject<boolean>(false);
  public group$ = this.route.paramMap.pipe(
    map((route) => parseInt(route.get('group'), 10)),
    distinctUntilChanged(),
    switchMap((groupID) => {
      if (!groupID) {
        return of(null as APIItem);
      }
      return this.itemService.getItem$(groupID, {
        fields: 'name_text,name_html,childs.brands',
      });
    }),
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(group);
    }),
    shareReplay(1)
  );

  public selectedBrands$: Observable<string[]> = this.group$.pipe(
    map((group) => {
      const result = [];
      for (const item of group.childs) {
        for (const brand of item.brands) {
          result.push(brand.catname);
        }
      }

      return result;
    })
  );

  private identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    switchMap((identity) => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(identity);
    })
  );

  public picture$: Observable<APIPicture> = combineLatest([
    this.group$,
    this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT),
    this.identity$,
  ]).pipe(
    switchMap(([group, isModer, identity]) => {
      let fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,' +
        'factories.name_html,moder_votes,votes,of_links,replaceable.name_html';

      if (isModer) {
        fields += ',items.item.brands.name_html';
      }

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            identity: identity,
            item_id: group.id,
            fields,
            limit: 1,
            items: {
              type_id: 1,
            },
            paginator: {
              item_id: group.id,
            },
          })
        ),
        map((response) => (response.pictures.length ? response.pictures[0] : null))
      );
    }),
    switchMap((picture) => {
      if (!picture) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(picture);
    }),
    tap((picture) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            title: picture.name_text,
            pageId: 28,
          }),
        0
      );
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private acl: ACLService,
    private pictureService: PictureService,
    private auth: AuthService,
    private router: Router
  ) {}

  reloadPicture() {
    this.changed$.next(true);
  }
}
