import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {PictureService} from '@services/picture';
import {PageEnvService} from '@services/page-env.service';

@Component({
  selector: 'app-persons-person-author-picture',
  templateUrl: './picture.component.html',
})
export class PersonsPersonAuthorPictureComponent {
  private changed$ = new BehaviorSubject<boolean>(false);

  private identity$ = this.route.paramMap.pipe(
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
    shareReplay(1)
  );

  public personID$ = this.route.parent.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged()
  );

  public picturesRouterLink$ = this.personID$.pipe(map((personID) => ['/persons', personID.toString(), 'author']));

  public galleryRouterLink$: Observable<string[]> = combineLatest([this.personID$, this.identity$]).pipe(
    map(([personID, identity]) => ['/persons', personID.toString(), 'author', 'gallery', identity])
  );

  public picture$ = combineLatest([this.identity$, this.personID$]).pipe(
    switchMap(([identity, itemID]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            exact_item_id: itemID,
            exact_item_link_type: 2,
            identity,
            fields,
            limit: 1,
            paginator: {
              exact_item_id: itemID,
              exact_item_link_type: 2,
            },
          })
        )
      );
    }),
    map((response) => (response.pictures.length ? response.pictures[0] : null)),
    tap((picture) => {
      this.pageEnv.set({
        pageId: 34,
        title: picture ? picture.name_text : '',
      });
    })
  );

  constructor(
    private pageEnv: PageEnvService,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private router: Router
  ) {}

  reloadPicture() {
    this.changed$.next(true);
  }
}
