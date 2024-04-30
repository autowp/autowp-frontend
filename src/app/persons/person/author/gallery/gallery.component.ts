import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIPaginator} from '@services/api.service';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {APIGalleryItem} from '../../../../gallery/definitions';

@Component({
  selector: 'app-persons-person-author-gallery',
  templateUrl: './gallery.component.html',
})
export class PersonsPersonAuthorGalleryComponent {
  protected paginator: APIPaginator;
  protected picturesRouterLink: string[];

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
    shareReplay(1),
  );

  protected readonly itemID$ = this.route.parent!.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  protected pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isGalleryPage: true},
        pageId: 34,
        title: item.name,
      });
    }, 0);
  }
}
