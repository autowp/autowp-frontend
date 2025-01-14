import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Date as GrpcDate} from '@grpc/google/type/date.pb';
import {
  APIGetUserRequest,
  APIItem,
  APIUser,
  APIUsersRequest,
  CommentTopicListOptions,
  DfDistanceListOptions,
  DfDistanceRequest,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemsRequest,
  ItemType,
  ItemVehicleTypeListOptions,
  Pages,
  Picture,
  PictureFields,
  PictureItemListOptions,
  PictureItemsRequest,
  PictureListOptions,
  PictureModerVoteListOptions,
  PicturesRequest,
  PictureStatus,
  SetPictureStatusRequest,
  VehicleType,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient, UsersClient} from '@grpc/spec.pbsc';
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTypeahead,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {Empty} from '@ngx-grpc/well-known-types';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {VehicleTypeService} from '@services/vehicle-type';
import {getPerspectiveTranslation, getVehicleTypeTranslation} from '@utils/translations';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIPerspectiveService} from '../../api/perspective/perspective.service';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {chunkBy} from '../../chunk';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {Thumbnail2Component} from '../../thumbnail/thumbnail2/thumbnail2.component';
import {ToastsService} from '../../toasts/toasts.service';

interface PerspectiveInList {
  name: string;
  value: 'null' | null | number;
}

interface VehicleTypeInPictures {
  deep: number;
  name: string;
  value: null | string;
}

const parseDate = (date: string): GrpcDate => {
  const parts = date.split('-');
  const year = parts.length > 0 ? parseInt(parts[0], 10) : 0;
  const month = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  const day = parts.length > 2 ? parseInt(parts[2], 10) : 0;

  return new GrpcDate({day, month, year});
};

function toPlainVehicleTypes(options: VehicleType[], deep: number): VehicleTypeInPictures[] {
  const result: VehicleTypeInPictures[] = [];
  for (const item of options) {
    result.push({
      deep,
      name: getVehicleTypeTranslation(item.name),
      value: item.id,
    });
    for (const subitem of toPlainVehicleTypes(item.childs ? item.childs : [], deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

@Component({
  imports: [
    RouterLink,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbTypeahead,
    FormsModule,
    PaginatorComponent,
    Thumbnail2Component,
    AsyncPipe,
  ],
  selector: 'app-moder-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerPicturesComponent implements OnDestroy, OnInit {
  private readonly perspectiveService = inject(APIPerspectiveService);
  private readonly moderVoteService = inject(PictureModerVoteService);
  private readonly vehicleTypeService = inject(VehicleTypeService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  private readonly moderVoteTemplateService = inject(APIPictureModerVoteTemplateService);
  private readonly itemsClient = inject(ItemsClient);
  readonly #languageService = inject(LanguageService);
  private readonly usersClient = inject(UsersClient);
  readonly #picturesClient = inject(PicturesClient);

  protected hasSelectedItem = false;
  private selected: string[] = [];

  protected status: null | string = null;
  protected readonly statusOptions = [
    {
      name: $localize`any`,
      value: null,
    },
    {
      name: $localize`inbox`,
      value: 'inbox',
    },
    {
      name: $localize`accepted`,
      value: 'accepted',
    },
    {
      name: $localize`in delete queue`,
      value: 'removing',
    },
    {
      name: $localize`all, except removing`,
      value: 'custom1',
    },
  ];

  private readonly defaultVehicleTypeOptions: VehicleTypeInPictures[] = [
    {
      deep: 0,
      name: $localize`any`,
      value: null,
    },
  ];
  protected vehicleTypeID: null | string = null;

  private readonly defaultPerspectiveOptions: PerspectiveInList[] = [
    {
      name: $localize`any`,
      value: null,
    },
    {
      name: $localize`empty`,
      value: 'null',
    },
  ];
  protected readonly perspectiveOptions$ = this.perspectiveService.getPerspectives$().pipe(
    map((perspectives) =>
      this.defaultPerspectiveOptions.slice(0).concat(
        perspectives.map((perspective) => ({
          name: getPerspectiveTranslation(perspective.name),
          value: perspective.id,
        })),
      ),
    ),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected perspectiveID: 'null' | null | number = null;

  protected readonly commentsOptions = [
    {
      name: $localize`not matters`,
      value: null,
    },
    {
      name: $localize`has`,
      value: true,
    },
    {
      name: $localize`has no`,
      value: false,
    },
  ];
  protected comments: boolean | null = null;

  protected readonly replaceOptions = [
    {
      name: $localize`not matters`,
      value: null,
    },
    {
      name: $localize`replaces`,
      value: true,
    },
    {
      name: $localize`without replaces`,
      value: false,
    },
  ];
  protected replace: boolean | null = null;

  protected readonly requestsOptions = [
    {
      name: $localize`not matters`,
      value: null,
    },
    {
      name: $localize`none`,
      value: 0,
    },
    {
      name: $localize`has accept votes`,
      value: 1,
    },
    {
      name: $localize`has delete votes`,
      value: 2,
    },
    {
      name: $localize`has any`,
      value: 3,
    },
  ];
  protected requests: null | number = null;

  protected readonly orderOptions: {name: string; value: PicturesRequest.Order}[] = [
    {
      name: $localize`Add date (new)`,
      value: PicturesRequest.Order.ORDER_ADD_DATE_DESC,
    },
    {
      name: $localize`Add date (old)`,
      value: PicturesRequest.Order.ORDER_ADD_DATE_ASC,
    },
    {
      name: $localize`Resolution (large)`,
      value: PicturesRequest.Order.ORDER_RESOLUTION_DESC,
    },
    {
      name: $localize`Resolution (small)`,
      value: PicturesRequest.Order.ORDER_RESOLUTION_ASC,
    },
    {
      name: $localize`Filesize (large)`,
      value: PicturesRequest.Order.ORDER_FILESIZE_DESC,
    },
    {
      name: $localize`Filesize (small)`,
      value: PicturesRequest.Order.ORDER_FILESIZE_ASC,
    },
    {
      name: $localize`Commented`,
      value: PicturesRequest.Order.ORDER_COMMENTS,
    },
    {
      name: $localize`Views`,
      value: PicturesRequest.Order.ORDER_VIEWS,
    },
    {
      name: $localize`Moderator votes`,
      value: PicturesRequest.Order.ORDER_MODER_VOTES,
    },
    {
      name: $localize`Removing date`,
      value: PicturesRequest.Order.ORDER_REMOVING_DATE,
    },
    {
      name: $localize`Likes`,
      value: PicturesRequest.Order.ORDER_LIKES,
    },
    {
      name: $localize`Dislikes`,
      value: PicturesRequest.Order.ORDER_DISLIKES,
    },
  ];
  protected order: PicturesRequest.Order = 0;

  protected similar = false;
  protected gps: boolean | null = null;
  protected lost = false;
  protected specialName = false;

  protected ownerID: string = '';
  protected ownerQuery = '';
  protected readonly ownersDataSource: (text$: Observable<string>) => Observable<APIUser[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        if (query.startsWith('#')) {
          return this.usersClient.getUser(new APIGetUserRequest({userId: query.substring(1) || ''})).pipe(
            catchError((err: unknown) => {
              this.#toastService.handleError(err);
              return EMPTY;
            }),
            map((user) => [user]),
          );
        }

        return this.usersClient
          .getUsers(
            new APIUsersRequest({
              limit: '10',
              search: query,
            }),
          )
          .pipe(
            catchError((err: unknown) => {
              this.#toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items || []),
          );
      }),
    );

  protected itemID: string = '';
  protected itemQuery = '';
  protected readonly itemsDataSource: (text$: Observable<string>) => Observable<APIItem[]> = (
    text$: Observable<string>,
  ) =>
    text$.pipe(
      debounceTime(200),
      switchMap((query) => {
        if (query === '') {
          return of([]);
        }

        const params = new ItemsRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.#languageService.language,
          limit: 10,
        });
        const options = new ItemListOptions();
        if (query.startsWith('#')) {
          const id = parseInt(query.substring(1), 10);
          if (id) {
            options.id = '' + id;
          }
        } else {
          options.name = '%' + query + '%';
        }
        params.options = options;

        return this.itemsClient.list(params).pipe(
          catchError((err: unknown) => {
            this.#toastService.handleError(err);
            return EMPTY;
          }),
          map((response) => (response.items ? response.items : [])),
        );
      }),
    );

  protected readonly vehicleTypeOptions$ = this.vehicleTypeService.getTypes$().pipe(
    map((types) => this.defaultVehicleTypeOptions.concat(toPlainVehicleTypes(types, 0))),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly change$ = new BehaviorSubject<void>(void 0);

  protected addedFrom: null | string = null;
  private readonly addedFrom$ = new BehaviorSubject<null | string>('');
  private addedFromSub?: Subscription = undefined;

  protected excludeItemID: string = '';
  protected excludeItemQuery = '';

  protected readonly data$: Observable<{
    chunks: Picture[][];
    paginator: Pages | undefined;
    pictures: Picture[];
  }> = this.route.queryParamMap.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    // eslint-disable-next-line sonarjs/cognitive-complexity
    switchMap((params) => {
      this.addedFrom = params.get('added_from') ? params.get('added_from') : null;
      this.status = params.get('status') ? params.get('status') : null;
      this.vehicleTypeID = params.get('vehicle_type_id') ? (params.get('vehicle_type_id') ?? '') : null;
      const perspectiveID = params.get('perspective_id');
      this.perspectiveID = perspectiveID === 'null' ? 'null' : parseInt(perspectiveID ?? '', 10) || null;
      this.itemID = params.get('item_id') ? (params.get('item_id') ?? '') : '';
      if (this.itemID && !this.itemQuery) {
        this.itemQuery = '#' + this.itemID;
      }
      this.excludeItemID = params.get('exclude_item_id') ? (params.get('exclude_item_id') ?? '') : '';
      if (this.excludeItemID && !this.excludeItemQuery) {
        this.excludeItemQuery = '#' + this.excludeItemID;
      }
      switch (params.get('comments')) {
        case 'false':
          this.comments = false;
          break;
        case 'true':
          this.comments = true;
          break;
        default:
          this.comments = null;
          break;
      }
      this.ownerID = params.get('owner_id') ?? '';
      if (this.ownerID && !this.ownerQuery) {
        this.ownerQuery = '#' + this.ownerID;
      }
      switch (params.get('replace')) {
        case 'false':
          this.replace = false;
          break;
        case 'true':
          this.replace = true;
          break;
        default:
          this.replace = null;
          break;
      }
      this.requests = params.get('requests') ? parseInt(params.get('requests') ?? '', 10) : null;
      this.specialName = !!params.get('special_name');
      this.lost = !!params.get('lost');
      this.gps = params.get('gps') ? true : null;
      this.similar = !!params.get('similar');
      this.order = params.get('order') ? parseInt(params.get('order') ?? '', 10) : 1;
      this.addedFrom = params.get('added_from') ?? '';

      this.selected = [];
      this.hasSelectedItem = false;

      const statuses = this.convertStatuses(this.status);

      const qParams = new PicturesRequest({
        fields: new PictureFields({
          commentsCount: true,
          dfDistance: this.similar ? new DfDistanceRequest({limit: 1}) : undefined,
          moderVote: true,
          nameHtml: true,
          nameText: true,
          pictureItem: new PictureItemsRequest({
            options: new PictureItemListOptions({
              item: new ItemListOptions({typeIds: [ItemType.ITEM_TYPE_VEHICLE, ItemType.ITEM_TYPE_BRAND]}),
            }),
          }),
          thumbMedium: true,
          views: true,
          votes: true,
        }),
        language: this.#languageService.language,
        limit: 18,
        options: new PictureListOptions({
          addedFrom: this.addedFrom ? parseDate(this.addedFrom) : undefined,
          commentTopic: this.comments === true ? new CommentTopicListOptions({messagesGtZero: true}) : undefined,
          dfDistance: this.similar
            ? new DfDistanceListOptions({
                dstPicture: statuses ? new PictureListOptions({statuses}) : undefined,
              })
            : undefined,
          hasNoComments: this.comments === false,
          hasNoPictureItem: this.lost,
          hasNoPictureModerVote: this.requests === 0,
          hasNoReplacePicture: this.replace === false,
          hasPoint: this.gps === true,
          hasSpecialName: this.specialName,
          ownerId: this.ownerID ? this.ownerID : undefined,
          pictureItem:
            this.vehicleTypeID || this.excludeItemID || this.itemID || this.perspectiveID
              ? new PictureItemListOptions({
                  excludeAncestorOrSelfId: this.excludeItemID,
                  hasNoPerspectiveId: this.perspectiveID === 'null',
                  itemParentCacheAncestor: this.itemID
                    ? new ItemParentCacheListOptions({parentId: this.itemID})
                    : undefined,
                  itemVehicleType: this.vehicleTypeID
                    ? new ItemVehicleTypeListOptions({vehicleTypeId: this.vehicleTypeID})
                    : undefined,
                  perspectiveId: this.perspectiveID && this.perspectiveID !== 'null' ? this.perspectiveID : undefined,
                })
              : undefined,
          pictureModerVote:
            this.requests === 1 ||
            this.requests === 2 ||
            this.requests === 3 ||
            this.order === PicturesRequest.Order.ORDER_MODER_VOTES
              ? new PictureModerVoteListOptions({
                  voteGtZero: this.requests === 1,
                  voteLteZero: this.requests === 2,
                })
              : undefined,
          replacePicture: this.replace === true ? new PictureListOptions({}) : undefined,
          statuses: statuses,
        }),
        order: this.similar ? PicturesRequest.Order.ORDER_DF_DISTANCE_SIMILARITY : this.order,
        page: parseInt(params.get('page') ?? '', 10),
        paginator: true,
      });

      return this.change$.pipe(
        switchMap(() => this.#picturesClient.getPictures(qParams)),
        catchError((response: unknown) => {
          this.#toastService.handleError(response);
          return EMPTY;
        }),
      );
    }),
    map((response) => ({
      chunks: chunkBy<Picture>(response.items || [], 3),
      paginator: response.paginator,
      pictures: response.items || [],
    })),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly moderVoteTemplateOptions$ = this.moderVoteTemplateService
    .getTemplates$()
    .pipe(shareReplay({bufferSize: 1, refCount: false}));

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 73,
        }),
      0,
    );

    this.addedFromSub = this.addedFrom$.pipe(distinctUntilChanged(), debounceTime(30)).subscribe((value) => {
      this.router.navigate([], {
        queryParams: {
          added_from: value ? value : null,
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  ngOnDestroy(): void {
    if (this.addedFromSub) {
      this.addedFromSub.unsubscribe();
    }
  }

  private convertStatuses(status: null | string): PictureStatus[] | undefined {
    switch (status) {
      case 'accepted':
        return [PictureStatus.PICTURE_STATUS_ACCEPTED];
      case 'custom1':
        return [PictureStatus.PICTURE_STATUS_INBOX, PictureStatus.PICTURE_STATUS_ACCEPTED];
      case 'inbox':
        return [PictureStatus.PICTURE_STATUS_INBOX];
      case 'removing':
        return [PictureStatus.PICTURE_STATUS_REMOVING];
    }

    return undefined;
  }

  protected onPictureSelect(active: boolean, picture: Picture) {
    if (active) {
      this.selected.push(picture.id);
    } else {
      const index = this.selected.indexOf(picture.id);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
    }
    this.hasSelectedItem = this.selected.length > 0;
  }

  protected itemFormatter(x: APIItem) {
    return x.nameText;
  }

  protected ownerFormatter(x: APIUser) {
    return x.name;
  }

  protected itemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        item_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected excludeItemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        exclude_item_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParams: {
        item_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearExcludeItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParams: {
        exclude_item_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected ownerOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParams: {
        owner_id: e.item.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected clearOwner(): void {
    this.ownerQuery = '';
    this.router.navigate([], {
      queryParams: {
        owner_id: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected votePictures(pictures: Picture[], vote: number, reason: string) {
    for (const id of this.selected) {
      const promises: Observable<Empty>[] = [];
      for (const picture of pictures) {
        if (picture.id === id) {
          const q$ = this.moderVoteService.vote$(picture.id, vote, reason);
          promises.push(q$);
        }
      }

      forkJoin(promises).subscribe(() => {
        this.change$.next();
      });
    }
    this.selected = [];
    this.hasSelectedItem = false;
  }

  protected acceptPictures(pictures: Picture[]) {
    for (const id of this.selected) {
      const promises: Observable<void>[] = [];
      for (const picture of pictures) {
        if (picture.id === id) {
          promises.push(
            this.#picturesClient
              .setPictureStatus(
                new SetPictureStatusRequest({id: picture.id, status: PictureStatus.PICTURE_STATUS_ACCEPTED}),
              )
              .pipe(
                catchError((err: unknown) => {
                  this.#toastService.handleError(err);
                  return EMPTY;
                }),
                tap(() => (picture.status = PictureStatus.PICTURE_STATUS_ACCEPTED)),
                map(() => void 0),
              ),
          );
        }
      }

      forkJoin(promises).subscribe(() => {
        this.change$.next();
      });
    }
    this.selected = [];
    this.hasSelectedItem = false;
  }

  protected onAddedFromInput() {
    this.addedFrom$.next(this.addedFrom);
  }

  protected readonly PicturesRequest = PicturesRequest;
}
