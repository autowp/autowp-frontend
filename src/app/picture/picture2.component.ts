import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  APIItem,
  APIItemLink,
  APIUser,
  CommentsSubscribeRequest,
  CommentsType,
  CommentsUnSubscribeRequest,
  ItemFields,
  ItemLinkListOptions,
  ItemLinksRequest,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemsRequest,
  ItemType,
  Picture,
  PictureItem,
  PictureItemFields,
  PictureItemListOptions,
  PictureItemsRequest,
  PictureItemType,
  PictureStatus,
  PicturesViewRequest,
  PicturesVoteRequest,
  SetPictureItemPerspectiveRequest,
  SetPictureStatusRequest,
} from '@grpc/spec.pb';
import {CommentsClient, ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbProgressbar, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {AuthService} from '@services/auth.service';
import {LanguageService} from '@services/language';
import {UserService} from '@services/user';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {TimeAgoPipe} from '@utils/time-ago.pipe';
import {NgDatePipesModule, NgMathPipesModule} from 'ngx-pipes';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap} from 'rxjs/operators';

import {ModerPicturesPerspectivePickerComponent} from '../moder/pictures/perspective-picker/perspective-picker.component';
import {PictureModerVote2Component} from '../picture-moder-vote/picture-moder-vote2/picture-moder-vote2.component';
import {ShareComponent} from '../share/share.component';
import {ToastsService} from '../toasts/toasts.service';
import {UserComponent} from '../user/user/user.component';
import {PicturePaginator2Component} from './paginator2.component';

@Component({
  imports: [
    RouterLink,
    ShareComponent,
    MarkdownComponent,
    UserComponent,
    NgbTooltip,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbProgressbar,
    ModerPicturesPerspectivePickerComponent,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgMathPipesModule,
    NgDatePipesModule,
    TimeAgoPipe,
    PictureModerVote2Component,
    PicturePaginator2Component,
  ],
  selector: 'app-picture2',
  styleUrls: ['./picture.component.scss'],
  templateUrl: './picture2.component.html',
})
export class Picture2Component {
  private readonly acl = inject(ACLService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly commentsGrpc = inject(CommentsClient);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastsService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);

  @Input() prefix: string[] = [];
  @Input() galleryRoute: string[] = [];
  @Input() h2 = false;
  @Output() changed = new EventEmitter<boolean>();

  @Input() set picture(picture: Picture) {
    this.picture$.next(picture);

    this.#picturesClient.view(new PicturesViewRequest({pictureId: picture.id})).subscribe();
  }
  protected readonly picture$ = new BehaviorSubject<null | Picture>(null);

  protected readonly owner$: Observable<APIUser | null> = this.picture$.pipe(
    switchMap((picture) => this.userService.getUser$(picture?.ownerId)),
  );

  protected readonly moderVotes$ = this.picture$.pipe(
    map((picture) =>
      (picture?.pictureModerVotes?.items || []).map((vote) => ({
        reason: vote.reason,
        user$: this.userService.getUser$(vote.userId),
        vote: vote.vote,
      })),
    ),
  );

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly canEditSpecs$ = this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.EDIT);
  protected showShareDialog = false;
  protected location = location;
  protected statusLoading = false;

  protected readonly user$ = this.auth.getUser$();

  protected savePerspective(perspectiveID: null | number, item: PictureItem) {
    this.#picturesClient
      .setPictureItemPerspective(
        new SetPictureItemPerspectiveRequest({
          itemId: item.itemId,
          perspectiveId: perspectiveID ?? undefined,
          pictureId: item.pictureId,
          type: item.type,
        }),
      )
      .pipe(
        catchError((error: unknown) => {
          this.toastService.handleError(error);
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected pictureVoted() {
    this.changed.emit(true);
  }

  protected toggleShareDialog(): false {
    this.showShareDialog = !this.showShareDialog;
    return false;
  }

  protected setSubscribed(picture: Picture, value: boolean) {
    (value
      ? this.commentsGrpc.subscribe(
          new CommentsSubscribeRequest({
            itemId: picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          }),
        )
      : this.commentsGrpc.unSubscribe(
          new CommentsUnSubscribeRequest({
            itemId: picture.id,
            typeId: CommentsType.PICTURES_TYPE_ID,
          }),
        )
    ).subscribe(() => {
      picture.subscribed = value;
    });
  }

  protected vote(picture: Picture, value: number) {
    this.#picturesClient
      .vote(
        new PicturesVoteRequest({
          pictureId: picture.id.toString(),
          value,
        }),
      )
      .subscribe((votes) => {
        picture.votes = votes;
      });
    return false;
  }

  protected openSource(picture: Picture) {
    if (picture.image) {
      window.open(picture.image.src);
    }
  }

  protected openGallery(picture: Picture, $event: MouseEvent) {
    if ($event.ctrlKey) {
      this.openSource(picture);
      return;
    }
    this.router.navigate(this.galleryRoute ? this.galleryRoute : ['../../gallery', picture.identity]);
  }

  private setPictureStatus(picture: Picture, status: PictureStatus) {
    this.statusLoading = true;
    this.#picturesClient
      .setPictureStatus(new SetPictureStatusRequest({id: picture.id, status}))
      .pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
      )
      .subscribe({
        complete: () => {
          this.statusLoading = false;
        },
        next: () => {
          this.changed.emit(true);
        },
      });
  }

  protected unacceptPicture(picture: Picture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_INBOX);
  }

  protected acceptPicture(picture: Picture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_ACCEPTED);
  }

  protected deletePicture(picture: Picture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_REMOVING);
  }

  protected restorePicture(picture: Picture) {
    this.setPictureStatus(picture, PictureStatus.PICTURE_STATUS_INBOX);
  }

  protected readonly factories$ = this.picture$.pipe(
    filter((picture) => !!picture),
    switchMap((picture) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.#languageService.language,
          limit: 10,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({pictureId: picture.id}),
            }),
            typeId: ItemType.ITEM_TYPE_FACTORY,
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly categories$ = this.picture$.pipe(
    filter((picture) => !!picture),
    switchMap((picture) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.#languageService.language,
          limit: 10,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({pictureId: picture.id}),
            }),
            typeId: ItemType.ITEM_TYPE_CATEGORY,
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly twins$ = this.picture$.pipe(
    filter((picture) => !!picture),
    switchMap((picture) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.#languageService.language,
          limit: 10,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({pictureId: picture.id}),
            }),
            typeId: ItemType.ITEM_TYPE_TWINS,
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly brands$: Observable<APIItem[]> = this.picture$.pipe(
    filter((picture) => !!picture),
    switchMap((picture) =>
      this.#itemsClient.list(
        new ItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.#languageService.language,
          limit: 10,
          options: new ItemListOptions({
            descendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({pictureId: picture.id}),
            }),
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly pictureItems$: Observable<PictureItem[]> = this.picture$
    .pipe(
      filter((picture) => !!picture),
      switchMap((picture) =>
        this.#picturesClient.getPictureItems(
          new PictureItemsRequest({
            fields: new PictureItemFields({
              item: new ItemsRequest({
                fields: new ItemFields({
                  altNames: true,
                  description: true,
                  design: true,
                  hasSpecs: true,
                  hasText: true,
                  nameHtml: true,
                  route: true,
                  specsRoute: true,
                }),
              }),
            }),
            language: this.#languageService.language,
            options: new PictureItemListOptions({pictureId: picture.id}),
          }),
        ),
      ),
    )
    .pipe(
      map((response) => response.items || []),
      shareReplay({bufferSize: 1, refCount: false}),
    );

  protected readonly contentItems$ = this.pictureItems$.pipe(
    map((items) => items.filter((item) => item.type === PictureItemType.PICTURE_ITEM_CONTENT)),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly links$: Observable<APIItemLink[]> = this.picture$.pipe(
    filter((picture) => !!picture),
    switchMap((picture) =>
      this.#itemsClient.getItemLinks(
        new ItemLinksRequest({
          options: new ItemLinkListOptions({
            itemParentCacheDescendant: new ItemParentCacheListOptions({
              pictureItemsByItemId: new PictureItemListOptions({pictureId: picture.id}),
            }),
            type: 'official',
          }),
        }),
      ),
    ),
    map((response) => response.items || []),
  );

  protected readonly takenDate$: Observable<null | {date: Date; format: string}> = this.picture$.pipe(
    filter((picture) => !!picture),
    map((picture) => {
      const date = picture.takenDate;
      if (!date) {
        return null;
      }

      if (date.year) {
        const resDate = new Date();
        resDate.setFullYear(date.year, 1, 1);
        let format = 'yyyy';
        if (date.month) {
          resDate.setFullYear(date.year, date.month, 1);
          format = 'MM.yyyy';
          if (date.day) {
            resDate.setFullYear(date.year, date.month, date.day);
            format = 'dd.MM.yyyy';
          }
        }
        return {date: resDate, format};
      }

      return null;
    }),
  );

  protected readonly PictureItemType = PictureItemType;
  protected readonly PictureStatus = PictureStatus;
  protected readonly ItemType = ItemType;
}
