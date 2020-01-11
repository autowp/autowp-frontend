import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import {Subscription, of, combineLatest, EMPTY} from 'rxjs';
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
import {ACLService} from '../services/acl.service';

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

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router,
    private acl: ACLService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.acl.inheritsRole('moder'),
      this.route.paramMap.pipe(
        map(route => route.get('identity')),
        distinctUntilChanged()
      )
    ]).pipe(
      switchMap(
        data => {
          if (!data[1]) {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }

          return this.pictureService.getCanonicalRoute(data[1]).pipe(
            switchMap(route => {
              if (route) {
                this.router.navigate(route, {
                  replaceUrl: true
                });
                return EMPTY;
              }

              const fields =
                'owner,name_html,name_text,image,preview_large,add_date,dpi,point,paginator,' +
                'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
                'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
                'twins.name_html,factories.name_html,moder_votes,votes,of_links,replaceable.name_html';

              return this.pictureService.getPictures({
                identity: data[1],
                status: data[0] ? null : 'accepted',
                fields: fields,
                limit: 1
              }).pipe(
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
