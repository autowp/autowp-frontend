import {OnInit, Component} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CategoriesService, CategoryPipeResult} from '../../service';
import {APIGalleryItem} from '../../../gallery/definitions';
import {APIItem} from '@services/item';

@Component({
  selector: 'app-category-gallery',
  templateUrl: './gallery.component.html',
})
export class CategoryGalleryComponent implements OnInit {
  protected readonly identity$ = this.route.paramMap.pipe(
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

  protected readonly data$: Observable<CategoryPipeResult> = this.categoriesService
    .categoryPipe$(this.route.parent)
    .pipe(
      switchMap((data) => {
        if (!data.current) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true,
          });
          return EMPTY;
        }
        return of(data);
      })
    );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router,
    private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: '', // data.picture.name_text,
        pageId: 187,
      });
    }, 0);
  }

  protected currentRouterLinkPrefix(category: APIItem, currentItem: APIItem, pathCatnames: string[]): string[] {
    if (!category) {
      return null;
    }

    if (currentItem.item_type_id === 3) {
      return ['/category', currentItem.catname];
    }

    return ['/category', category.catname].concat(pathCatnames);
  }

  protected pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: 187,
      });
    }, 0);
  }
}
