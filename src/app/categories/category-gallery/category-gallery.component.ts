import {OnInit, Component} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '../../services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {CatagoriesService, CategoryPipeResult} from '../service';
import {APIGalleryItem} from '../../gallery/definitions';
import {APIItem} from '../../services/item';

@Component({
  selector: 'app-category-gallery',
  templateUrl: './category-gallery.component.html',
})
export class CategoryGalleryComponent implements OnInit {
  public identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    debounceTime(10),
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

  public data$: Observable<CategoryPipeResult> = this.categoriesService.categoryPipe$(this.route).pipe(
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
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    this.pageEnv.set({
      layout: {isGalleryPage: true},
      title: '', // data.picture.name_text,
      pageId: 187,
    });
  }

  public currentRouterLinkPrefix(category: APIItem, currentItem: APIItem, pathCatnames: string[]): string[] {
    if (!category) {
      return null;
    }

    if (currentItem.item_type_id === 3) {
      return ['/category', currentItem.catname];
    }

    return ['/category', category.catname].concat(pathCatnames);
  }

  pictureSelected(item: APIGalleryItem) {
    this.pageEnv.set({
      layout: {isGalleryPage: true},
      title: item.name,
      pageId: 187,
    });
  }
}
