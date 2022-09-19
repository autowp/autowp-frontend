import {Component} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {APIGalleryItem} from '../../../gallery/definitions';
import {BrandPerspectivePageData} from '../../catalogue.module';

@Component({
  selector: 'app-catalogue-mixed-gallery',
  templateUrl: './gallery.component.html'
})
export class CatalogueMixedGalleryComponent {
  public identity$ = this.route.paramMap.pipe(
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
    }),
  );

  public brand$: Observable<APIItem> = this.route.paramMap.pipe(
    map(params => params.get('brand')),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(catname => {
      if (!catname) {
        return EMPTY;
      }
      return this.itemService.getItems({
        catname,
        fields: 'name_text,name_html',
        limit: 1
      });
    }),
    map(response => response && response.items.length ? response.items[0] : null),
    switchMap(brand => {
      if (!brand) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(brand);
    })
  );

  public data$ = this.route.data as Observable<BrandPerspectivePageData>;

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {
  }

  pictureSelected(data: BrandPerspectivePageData, item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: data.picture_page.id
      });
    }, 0);
  }
}
