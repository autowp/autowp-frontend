import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, of} from 'rxjs';
import {ItemService} from '../../../../services/item';
import {PictureService} from '../../../../services/picture';
import {PageEnvService} from '../../../../services/page-env.service';
import {ToastsService} from '../../../../toasts/toasts.service';

@Component({
  selector: 'app-persons-person-author-picture',
  templateUrl: './picture.component.html'
})
export class PersonsPersonAuthorPictureComponent {
  private changed$ = new BehaviorSubject<boolean>(false);

  private identity$ = this.route.paramMap.pipe(
    map(route => route.get('identity')),
    distinctUntilChanged(),
    switchMap(identity => {
      if (!identity) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true
        });
        return EMPTY;
      }
      return of(identity);
    }),
    shareReplay(1)
  );

  public person$ = this.route.paramMap.pipe(
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
    }),
    shareReplay(1)
  );

  public picturesRouterLink$ = this.person$.pipe(
    map(person => ['/persons', person.id.toString(), 'author'])
  );

  public galleryRouterLink$ = combineLatest([this.person$, this.identity$]).pipe(
    map(([person, identity]) => ['/persons', person.id.toString(), 'author', 'gallery', identity])
  );

  public picture$ = combineLatest([this.identity$, this.person$]).pipe(
    switchMap(([identity, item]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() => this.pictureService.getPictures({
          exact_item_id: item.id,
          exact_item_link_type: 2,
          identity,
          fields,
          limit: 1,
          paginator: {
            exact_item_id: item.id,
            exact_item_link_type: 2,
          }
        })),
      );
    }),
    map(response => response.pictures.length ? response.pictures[0] : null),
    tap(picture => {
      this.pageEnv.set({
        layout: {
          needRight: false
        },
        pageId: 34,
        nameTranslated: picture ? picture.name_text : ''
      });
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router,
    private itemService: ItemService,
    private toastService: ToastsService
  ) { }

  reloadPicture() {
    this.changed$.next(true);
  }
}
