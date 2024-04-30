import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, EMPTY, Observable, combineLatest, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-persons-person-author-picture',
  templateUrl: './picture.component.html',
})
export class PersonsPersonAuthorPictureComponent {
  private readonly changed$ = new BehaviorSubject<boolean>(false);

  private readonly identity$ = this.route.paramMap.pipe(
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

  protected readonly personID$ = this.route.parent!.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
  );

  protected readonly picturesRouterLink$ = this.personID$.pipe(
    map((personID) => ['/persons', personID.toString(), 'author']),
  );

  protected readonly galleryRouterLink$: Observable<string[]> = combineLatest([this.personID$, this.identity$]).pipe(
    map(([personID, identity]) => ['/persons', personID.toString(), 'author', 'gallery', identity]),
  );

  protected readonly picture$: Observable<APIPicture | null> = combineLatest([this.identity$, this.personID$]).pipe(
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
            fields,
            identity,
            limit: 1,
            paginator: {
              exact_item_id: itemID,
              exact_item_link_type: 2,
            },
          }),
        ),
      );
    }),
    map((response) => (response.pictures.length ? response.pictures[0] : null)),
    tap((picture) => {
      this.pageEnv.set({
        pageId: 34,
        title: picture ? picture.name_text : '',
      });
    }),
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly router: Router,
  ) {}

  protected reloadPicture() {
    this.changed$.next(true);
  }
}
