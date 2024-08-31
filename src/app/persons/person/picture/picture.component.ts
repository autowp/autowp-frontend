import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-persons-person-picture',
  templateUrl: './picture.component.html',
})
export class PersonsPersonPictureComponent {
  private readonly changed$ = new BehaviorSubject<void>(void 0);

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
    shareReplay(1),
  );

  protected readonly picture$: Observable<APIPicture | null> = combineLatest([this.itemID$, this.identity$]).pipe(
    switchMap(([itemID, identity]) => {
      const fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,items.item.has_text,items.item.route,' +
        'twins.name_html,factories.name_html,moder_votes,moder_voted,votes,of_links,replaceable.name_html';

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            exact_item_id: itemID,
            fields,
            identity,
            limit: 1,
            paginator: {
              exact_item_id: itemID,
            },
          }),
        ),
        map((response) => (response.pictures.length ? response.pictures[0] : null)),
      );
    }),
    tap((picture) => {
      this.pageEnv.set({
        pageId: 34,
        title: picture ? picture.name_text : '',
      });
    }),
    shareReplay(1),
  );

  protected readonly CommentsType = CommentsType;

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly router: Router,
  ) {}

  protected reloadPicture() {
    this.changed$.next();
  }
}
