import {Component} from '@angular/core';
import {of, BehaviorSubject, EMPTY, combineLatest, Observable} from 'rxjs';
import {APIPicture, PictureService} from '@services/picture';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, distinctUntilChanged, map, tap, shareReplay} from 'rxjs/operators';
import {CategoriesService} from '../../service';
import {CommentsType, ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-category-picture',
  templateUrl: './picture.component.html',
})
export class CategoryPictureComponent {
  private readonly changed$ = new BehaviorSubject<boolean>(false);

  private readonly identity$ = this.route.paramMap.pipe(
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

  private readonly categoryData$ = this.categoriesService.categoryPipe$(this.route.parent.parent).pipe(
    switchMap((data) => {
      if (!data.current) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  protected readonly currentRouterLinkPrefix$ = this.categoryData$.pipe(
    map(({category, current, pathCatnames}) => {
      if (!category) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname, 'pictures'];
      }

      return ['/category', category.catname, ...pathCatnames, 'pictures'];
    })
  );

  protected readonly picture$: Observable<APIPicture> = combineLatest([this.categoryData$, this.identity$]).pipe(
    switchMap(([{current}, identity]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories,categories.name_html,copyrights,,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            identity: identity,
            item_id: current.id,
            fields,
            limit: 1,
            items: {
              type_id: 1,
            },
            paginator: {
              item_id: current.id,
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
      this.pageEnv.set({
        title: picture.name_text,
        pageId: 187,
      });
    })
  );

  protected readonly currentRouterLinkGallery$ = combineLatest([this.categoryData$, this.identity$]).pipe(
    map(([{category, current, pathCatnames}, identity]) => {
      if (!category || !identity) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname, 'gallery', identity];
      }

      return ['/category', category.catname, ...pathCatnames, 'gallery', identity];
    })
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly pictureService: PictureService,
    private readonly router: Router,
    private readonly categoriesService: CategoriesService
  ) {}

  protected reloadPicture() {
    this.changed$.next(true);
  }
}
