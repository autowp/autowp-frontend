import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIPaginator} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../../gallery/definitions';
import {GalleryComponent} from '../../../../gallery/gallery.component';

@Component({
  imports: [GalleryComponent, AsyncPipe],
  selector: 'app-persons-person-author-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
})
export class PersonsPersonAuthorGalleryComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected paginator: APIPaginator | null = null;
  protected picturesRouterLink: string[] = [];

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
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly itemID$ = this.route.parent!.paramMap.pipe(
    map((params) => parseInt(params.get('id') ?? '', 10)),
    distinctUntilChanged(),
  );

  protected pictureSelected(item: APIGalleryItem | null) {
    if (item) {
      setTimeout(() => {
        this.pageEnv.set({
          layout: {isGalleryPage: true},
          pageId: 34,
          title: item.name,
        });
      }, 0);
    }
  }
}
