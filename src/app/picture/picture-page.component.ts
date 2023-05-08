import {Component} from '@angular/core';
import {of, EMPTY, BehaviorSubject, throwError} from 'rxjs';
import {APIItem} from '@services/item';
import {PictureService} from '@services/picture';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {switchMap, distinctUntilChanged, map, catchError, debounceTime, tap} from 'rxjs/operators';
import {PathItem} from '../categories/definitions';
import {HttpErrorResponse} from '@angular/common/http';
import {CommentsType} from '@grpc/spec.pb';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture-page.component.html',
})
export class PicturePageComponent {
  public category: APIItem;
  public current: APIItem;
  public path: PathItem[];
  private changed$ = new BehaviorSubject<boolean>(false);

  public picture$ = this.route.paramMap.pipe(
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
                identity,
                fields,
                limit: 1,
              })
            ),
            switchMap((response) => {
              if (response.pictures.length <= 0) {
                this.router.navigate(['/error-404'], {
                  skipLocationChange: true,
                });
                return EMPTY;
              }
              return of(response.pictures[0]);
            })
          );
        })
      );
    }),
    tap((picture) => {
      this.pageEnv.set({
        title: picture.name_text,
        pageId: 187,
      });
    })
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  reloadPicture() {
    this.changed$.next(true);
  }
}
