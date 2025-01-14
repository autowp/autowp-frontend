import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentsType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {APIPicture, PictureService} from '@services/picture';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {CommentsComponent} from '../../../../comments/comments/comments.component';
import {PictureComponent} from '../../../../picture/picture.component';

@Component({
  imports: [PictureComponent, CommentsComponent, AsyncPipe],
  selector: 'app-twins-group-picture',
  templateUrl: './picture.component.html',
})
export class TwinsGroupPictureComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly acl = inject(ACLService);
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);

  private readonly changed$ = new BehaviorSubject<void>(void 0);

  protected readonly groupId$ = this.route.parent!.parent!.paramMap.pipe(
    map((route) => route.get('group') ?? ''),
    distinctUntilChanged(),
    shareReplay({bufferSize: 1, refCount: false}),
  );

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
  );

  protected readonly picture$: Observable<APIPicture> = combineLatest([
    this.groupId$,
    this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT),
    this.identity$,
  ]).pipe(
    switchMap(([groupId, isModer, identity]) => {
      let fields =
        'owner,name_html,name_text,image,preview_large,paginator,subscribed,taken_date,rights,' +
        'items.item.design,items.item.description,items.item.specs_route,items.item.has_specs,items.item.alt_names,' +
        'items.item.name_html,categories.name_html,copyrights,' +
        'factories.name_html,moder_votes,votes,of_links,replaceable.name_html';

      if (isModer) {
        fields += ',items.item.brands.name_html';
      }

      return this.changed$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$({
            fields,
            identity: identity,
            item_id: +groupId,
            items: {
              type_id: 1,
            },
            limit: 1,
            paginator: {
              item_id: +groupId,
            },
          }),
        ),
        map((response) => (response.pictures.length ? response.pictures[0] : null)),
      );
    }),
    switchMap((picture) => {
      if (!picture) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(picture);
    }),
    tap((picture) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 28,
            title: picture.name_text,
          }),
        0,
      );
    }),
  );

  protected readonly CommentsType = CommentsType;

  protected reloadPicture() {
    this.changed$.next();
  }
}
