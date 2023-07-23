import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../gallery/definitions';

@Component({
  selector: 'app-twins-group-gallery',
  templateUrl: './twins-group-gallery.component.html',
})
export class TwinsGroupGalleryComponent {
  protected readonly group$ = this.route.parent.parent.paramMap.pipe(
    map((route) => parseInt(route.get('group'), 10)),
    distinctUntilChanged(),
    switchMap((groupID) => {
      if (!groupID) {
        return of(null as APIItem);
      }
      return this.itemService.getItem$(groupID, {
        fields: 'name_text,name_html',
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
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            layout: {isGalleryPage: true},
            pageId: 28,
            title: group.name_text,
          }),
        0
      );
    })
  );

  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged()
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router
  ) {}

  protected pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        pageId: 28,
        title: item.name,
      });
    });
  }
}
