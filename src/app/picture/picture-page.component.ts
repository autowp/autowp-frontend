import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import {Subscription, of, EMPTY, BehaviorSubject} from 'rxjs';
import { APIItem} from '../services/item';
import {APIPicture, PictureService} from '../services/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  map
} from 'rxjs/operators';
import {PathItem} from '../categories/definitions';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture-page.component.html'
})
@Injectable()
export class PicturePageComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public current: APIItem;
  public picture: APIPicture;
  public path: PathItem[];
  private changed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged(),
      switchMap(
        identity => {
          if (!identity) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }

          return this.pictureService.getCanonicalRoute(identity).pipe(
            switchMap(route => {
              if (route && route.length > 0) {
                this.router.navigate(route, {
                  replaceUrl: true
                });
                return EMPTY;
              }

              const fields =
                'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
                'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
                'items.item.name_html,categories.name_html,copyrights,' +
                'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

              return this.changed$.pipe(
                switchMap(value => this.pictureService.getPictures({
                  identity: identity,
                  fields: fields,
                  limit: 1
                })),
                switchMap(response => {
                  if (response.pictures.length <= 0) {
                    this.router.navigate(['/error-404'], {
                      skipLocationChange: true
                    });
                    return EMPTY;
                  }
                  return of(response.pictures[0]);
                })
              );
            })
          );
        }
      )
    )
      .subscribe((picture) => {
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: picture.name_text,
          pageId: 187
        });

        this.picture = picture;
      });
  }

  reloadPicture() {
    this.changed$.next(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
