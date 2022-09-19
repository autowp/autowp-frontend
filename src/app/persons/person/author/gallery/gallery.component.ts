import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {APIPaginator} from '../../../../services/api.service';
import {ItemService} from '../../../../services/item';
import {PageEnvService} from '../../../../services/page-env.service';
import {ToastsService} from '../../../../toasts/toasts.service';
import {APIGalleryItem} from '../../../../gallery/definitions';
import {ItemType} from '../../../../../../generated/spec.pb';

@Component({
  selector: 'app-persons-person-author-gallery',
  templateUrl: './gallery.component.html'
})
export class PersonsPersonAuthorGalleryComponent {
  public paginator: APIPaginator;
  public picturesRouterLink: string[];
  public galleryRouterLink: string[];

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

      return of(identity)
    }),
    shareReplay(1)
  );

  public item$ = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id'), 10)),
    distinctUntilChanged(),
    debounceTime(10),
    switchMap(id => this.itemService.getItem(id, {
      fields: ['name_text', 'name_html', 'description'].join(',')
    })),
    catchError(err => {
      this.toastService.response(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true
      });
      return EMPTY;
    }),
    switchMap(item => {
      if (item.item_type_id !== ItemType.ITEM_TYPE_PERSON) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }

      return of(item);
    }),
  );

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private toastService: ToastsService
  ) {
  }

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: 34
      });
    }, 0);
  }
}
