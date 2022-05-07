import { Component } from '@angular/core';
import {of, BehaviorSubject, EMPTY, combineLatest} from 'rxjs';
import { ItemService } from '../../services/item';
import {PictureService} from '../../services/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {switchMap, distinctUntilChanged, map, tap, debounceTime, shareReplay} from 'rxjs/operators';
import { PathItem } from '../definitions';
import { CatagoriesService } from '../service';
import {ItemType} from '../../../../generated/spec.pb';

@Component({
  selector: 'app-category-picture',
  templateUrl: './category-picture.component.html'
})
export class CategoryPictureComponent {
  private changed$ = new BehaviorSubject<boolean>(false);

  private identity$ = this.route.paramMap.pipe(
    map(route => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(identity => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(identity);
    })
  );

  private categoryData$ = this.categoriesService.categoryPipe(this.route).pipe(
    switchMap(data => {
      if (!data.current) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(data);
    }),
    shareReplay(1)
  );

  public category$ = this.categoryData$.pipe(
    map(({category}) => category)
  );

  public current$ = this.categoryData$.pipe(
    map(({current}) => current)
  );

  public currentRouterLinkPrefix$ = this.categoryData$.pipe(
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

  public path$ = this.categoryData$.pipe(
    map(({pathItems}) => pathItems)
  );

  public picture$ = combineLatest([this.categoryData$, this.identity$]).pipe(
    switchMap(([{current}, identity]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories,categories.name_html,copyrights,,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() => this.pictureService.getPictures({
          identity: identity,
          item_id: current.id,
          fields,
          limit: 1,
          items: {
            type_id: 1
          },
          paginator: {
            item_id: current.id
          }
        })),
        map(response => response.pictures.length ? response.pictures[0] : null)
      );
    }),
    switchMap(picture => {
      if (!picture) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(picture);
    }),
    tap(picture => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        nameTranslated: picture.name_text,
        pageId: 187
      });
    })
  );

  public currentRouterLinkGallery$ = combineLatest([this.categoryData$, this.picture$]).pipe(
    map(([{category, current, pathCatnames}, picture]) => {
      if (!category || !picture) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname, 'gallery'];
      }

      return ['/category', category.catname, ...pathCatnames, 'gallery', picture.identity];
    })
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router,
    private categoriesService: CatagoriesService
  ) {}

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService.getItems({
        fields: 'catname,name_html',
        parent_id: item.parent_id,
        no_parent: item.parent_id ? null : true,
        limit: 50,
        type_id: 3
      }).subscribe((response) => {
        item.loaded = true;
        item.childs = response.items;
      });
    }
  }

  reloadPicture() {
    this.changed$.next(true);
  }
}
