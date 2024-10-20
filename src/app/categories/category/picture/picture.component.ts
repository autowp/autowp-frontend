import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType, ItemType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CategoriesService} from '../../service';

@Component({
  selector: 'app-category-picture',
  templateUrl: './picture.component.html',
})
export class CategoryPictureComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);
  private readonly categoriesService = inject(CategoriesService);

  private readonly changed$ = new BehaviorSubject<void>(void 0);

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
    }),
  );

  private readonly categoryData$ = this.categoriesService.categoryPipe$(this.route.parent!.parent!).pipe(
    switchMap((data) => {
      if (!data.current) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1),
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
    }),
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
            fields,
            identity: identity,
            item_id: current.id,
            items: {
              type_id: 1,
            },
            limit: 1,
            paginator: {
              item_id: current.id,
            },
          }),
        ),
        map((response) => (response.pictures.length ? response.pictures[0] : null)),
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
        pageId: 187,
        title: picture.name_text,
      });
    }),
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
    }),
  );

  protected readonly CommentsType = CommentsType;

  protected reloadPicture() {
    this.changed$.next();
  }
}
