import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../../comments/comments/comments.component';
import {PictureComponent} from '../../../../picture/picture.component';

@Component({
  imports: [PictureComponent, CommentsComponent, AsyncPipe],
  selector: 'app-persons-person-author-picture',
  standalone: true,
  templateUrl: './picture.component.html',
})
export class PersonsPersonAuthorPictureComponent {
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);

  private readonly changed$ = new BehaviorSubject<void>(void 0);

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
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly personID$ = this.route.parent!.paramMap.pipe(
    map((params) => parseInt(params.get('id') ?? '', 10)),
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

  protected reloadPicture() {
    this.changed$.next();
  }
}
