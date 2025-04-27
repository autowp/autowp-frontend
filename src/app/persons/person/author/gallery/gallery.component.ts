import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Picture, PictureItemType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {GalleryComponent} from '../../../../gallery/gallery.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleryComponent, AsyncPipe],
  selector: 'app-persons-person-author-gallery',
  templateUrl: './gallery.component.html',
})
export class PersonsPersonAuthorGalleryComponent {
  readonly #pageEnv = inject(PageEnvService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  protected picturesRouterLink: string[] = [];

  protected readonly identity$ = this.#route.paramMap.pipe(
    map((route) => route.get('identity')),
    distinctUntilChanged(),
    switchMap((identity) => {
      if (!identity) {
        this.#router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(identity);
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly itemID$ = this.#route.parent!.parent!.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    distinctUntilChanged(),
  );

  protected pictureSelected(item: null | Picture) {
    if (item) {
      setTimeout(() => {
        this.#pageEnv.set({
          layout: {isGalleryPage: true},
          pageId: 34,
          title: item.nameText,
        });
      }, 0);
    }
  }

  protected readonly PictureItemType = PictureItemType;
}
