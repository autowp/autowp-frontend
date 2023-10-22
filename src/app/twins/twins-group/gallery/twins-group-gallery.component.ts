import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../gallery/definitions';

@Component({
  selector: 'app-twins-group-gallery',
  templateUrl: './twins-group-gallery.component.html',
})
export class TwinsGroupGalleryComponent {
  protected readonly group$: Observable<APIItem> = this.route.parent.parent.paramMap.pipe(
    map((route) => route.get('group')),
    distinctUntilChanged(),
    switchMap((groupID) => {
      if (!groupID) {
        return of(null as APIItem);
      }
      return this.itemsClient.item(
        new ItemRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          id: groupID,
          language: this.languageService.language,
        }),
      );
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
            title: group.nameText,
          }),
        0,
      );
    }),
  );

  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router,
    private readonly itemsClient: ItemsClient,
    private readonly languageService: LanguageService,
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
