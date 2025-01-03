import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIItem, ItemFields, ItemRequest} from '@grpc/spec.pb';
import {ItemsClient} from '@grpc/spec.pbsc';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../gallery/definitions';
import {GalleryComponent} from '../../../gallery/gallery.component';

@Component({
  imports: [GalleryComponent, AsyncPipe],
  selector: 'app-twins-group-gallery',
  templateUrl: './twins-group-gallery.component.html',
})
export class TwinsGroupGalleryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly router = inject(Router);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);

  protected readonly group$: Observable<APIItem | null> = this.route.parent!.parent!.paramMap.pipe(
    map((route) => route.get('group')),
    distinctUntilChanged(),
    switchMap((groupID) => {
      if (!groupID) {
        return of(null);
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
            title: group ? group.nameText : '',
          }),
        0,
      );
    }),
  );

  protected readonly identity$ = this.route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
  );

  protected pictureSelected(item: APIGalleryItem | null) {
    if (item) {
      setTimeout(() => {
        this.pageEnv.set({
          layout: {isGalleryPage: true},
          pageId: 28,
          title: item.name,
        });
      });
    }
  }
}
