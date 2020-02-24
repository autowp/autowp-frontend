import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, of, Subscription} from 'rxjs';
import {APIGetPicturesOptions, APIPicture, PictureService} from '../../../services/picture';
import {ToastsService} from '../../../toasts/toasts.service';

@Component({
  selector: 'app-persons-person-picture',
  templateUrl: './picture.component.html'
})
@Injectable()
export class PersonsPersonPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public isModer: boolean;
  public routerLink: string[];
  public picturesRouterLink: string[];
  public galleryRouterLink: string[];
  public item: APIItem;
  public picture: APIPicture;

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router,
    private itemService: ItemService,
    private toastService: ToastsService
  ) {
  }

  ngOnInit(): void {
    this.sub = this.getPerson().pipe(
      map(item => {
        const routerLink = ['/persons', item.id.toString()];

        this.routerLink = routerLink;
        this.picturesRouterLink = [...routerLink];
        this.galleryRouterLink = [...routerLink];
        this.galleryRouterLink.push('gallery');

        return item;
      }),
      switchMap(item => this.getIdentity().pipe(
        map(identity => {

          this.galleryRouterLink.push(identity);

          return {
            item: item,
            identity: identity
          };
        })
      )),
      switchMap(data => {
        if (!data.identity) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        this.item = data.item;

        return this.getPicture(data.identity, data.item.id, false); // TODO: isModer
      })
    ).subscribe(picture => {
      this.picture = picture;
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        pageId: 34,
        nameTranslated: picture.name_text
      });
    });
  }

  private getPicture(identity: string, itemID: number, isModer: boolean) {
    const fields =
      'owner,name_html,name_text,image,preview_large,add_date,dpi,point,paginator,' +
      'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
      'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
      'twins.name_html,factories.name_html,moder_votes,votes,of_links,replaceable.name_html';

    const options: APIGetPicturesOptions = {
      identity: identity,
      item_id: itemID,
      fields: fields,
      limit: 1,
      items: {
        type_id: 1
      },
      paginator: {
        item_id: itemID
      }
    };
    if (! isModer) {
      options.status = 'accepted';
    }

    return this.pictureService.getPictures(options).pipe(
      map(response => response.pictures.length ? response.pictures[0] : null)
    );
  }

  private getIdentity() {
    return this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged()
    );
  }

  getPerson(): Observable<APIItem> {
    return this.route.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      debounceTime(30),
      switchMap(id =>
        this.itemService.getItem(id, {
          fields: ['name_text', 'name_html', 'description'].join(',')
        })
      ),
      catchError(err => {
        this.toastService.response(err);
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }),
      switchMap(item => {
        if (item.item_type_id !== 8) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return EMPTY;
        }

        return of(item);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
