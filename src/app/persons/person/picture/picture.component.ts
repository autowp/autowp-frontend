import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {APIItem, ItemService} from '../../../services/item';
import {PageEnvService} from '../../../services/page-env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, EMPTY, Observable, of, Subscription} from 'rxjs';
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
  private changed$ = new BehaviorSubject<boolean>(false);

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
      map(person => {
        const routerLink = ['/persons', person.id.toString()];

        this.routerLink = routerLink;
        this.picturesRouterLink = [...routerLink];
        this.galleryRouterLink = [...routerLink];
        this.galleryRouterLink.push('gallery');

        return person;
      }),
      switchMap(person => this.getIdentity().pipe(
        map(identity => {

          this.galleryRouterLink.push(identity);

          return {
            item: person,
            identity
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

        return this.getPicture(data.identity, data.item.id);
      })
    ).subscribe(picture => {
      this.picture = picture;
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        pageId: 34,
        nameTranslated: picture ? picture.name_text : ''
      });
    });
  }

  private getPicture(identity: string, itemID: number) {
    const fields =
      'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
      'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
      'items.item.name_html,categories.name_html,copyrights,items.item.has_text,items.item.route,' +
      'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

    const options: APIGetPicturesOptions = {
      exact_item_id: itemID,
      identity,
      fields,
      limit: 1,
      paginator: {
        exact_item_id: itemID,
      }
    };

    return this.changed$.pipe(
      switchMap(value => this.pictureService.getPictures(options)),
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
    return this.route.paramMap.pipe(
      map(params => parseInt(params.get('id'), 10)),
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

  reloadPicture() {
    this.changed$.next(true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
