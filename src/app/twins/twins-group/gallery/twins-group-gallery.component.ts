import {Component} from '@angular/core';
import {of, EMPTY} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {APIGalleryItem} from '../../../gallery/definitions';

@Component({
  selector: 'app-twins-group-gallery',
  templateUrl: './twins-group-gallery.component.html',
})
export class TwinsGroupGalleryComponent {
  public group$ = this.route.parent.parent.paramMap.pipe(
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
            title: group.name_text,
            pageId: 28,
          }),
        0
      );
    })
  );

  public identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged()
  );

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router
  ) {}

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        title: item.name,
        pageId: 28,
      });
    });
  }
}
