import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {APIItem} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import {PathItem} from '../categories/service';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture-page.component.html',
})
export class PicturePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);

  protected category: APIItem | null = null;
  protected current: APIItem | null = null;
  protected path: PathItem[] = [];
  private readonly changed$ = new BehaviorSubject<void>(void 0);

  protected readonly picture$: Observable<APIPicture | null> = this.route.paramMap.pipe(
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

      return this.pictureService.getCanonicalRoute$(identity).pipe(
        catchError((response: unknown) => {
          if (response instanceof HttpErrorResponse && response.status === 404) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true,
            });
            return EMPTY;
          }
          return throwError(() => response);
        }),
        switchMap((route) => {
          if (route && route.length > 0) {
            this.router.navigate(route, {
              replaceUrl: true,
            });
            return EMPTY;
          }

          const fields =
            'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
            'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
            'items.item.name_html,categories.name_html,copyrights,' +
            'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

          return this.changed$.pipe(
            switchMap(() =>
              this.pictureService.getPictures$({
                fields,
                identity,
                limit: 1,
              }),
            ),
            switchMap((response) => {
              if (response.pictures.length <= 0) {
                this.router.navigate(['/error-404'], {
                  skipLocationChange: true,
                });
                return EMPTY;
              }
              return of(response.pictures[0]);
            }),
          );
        }),
      );
    }),
    tap((picture) => {
      this.pageEnv.set({
        pageId: 187,
        title: picture ? picture.name_text : '',
      });
    }),
  );

  protected readonly CommentsType = CommentsType;

  protected reloadPicture() {
    this.changed$.next();
  }
}
