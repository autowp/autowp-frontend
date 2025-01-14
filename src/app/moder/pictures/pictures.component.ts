import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIGetUserRequest,
  APIItem,
  APIUser,
  APIUsersRequest,
  ItemFields,
  ItemListOptions,
  ListItemsRequest,
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
import {APIPaginator} from '@services/api.service';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {APIGetPicturesOptions, APIPicture, PictureService} from '@services/picture';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {VehicleTypeService} from '@services/vehicle-type';
import {getPerspectiveTranslation, getVehicleTypeTranslation} from '@utils/translations';
import {BehaviorSubject, EMPTY, forkJoin, Observable, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {APIPerspectiveService} from '../../api/perspective/perspective.service';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';
import {chunkBy} from '../../chunk';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {ThumbnailComponent} from '../../thumbnail/thumbnail/thumbnail.component';
import {ToastsService} from '../../toasts/toasts.service';

interface PerspectiveInList {
  name: string;
  value: 'null' | null | number;
}

interface VehicleTypeInPictures {
  deep: number;
  name: string;
  value: null | number;
}

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
    ThumbnailComponent,
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
  private readonly pictureService = inject(PictureService);
  private readonly router = inject(Router);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly moderVoteTemplateService = inject(APIPictureModerVoteTemplateService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly usersClient = inject(UsersClient);
  private readonly picturesClient = inject(PicturesClient);

  protected hasSelectedItem = false;
  private selected: number[] = [];

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
  protected vehicleTypeID: null | number = null;

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

  protected readonly orderOptions = [
    {
      name: $localize`Add date (new)`,
      value: 1,
    },
    {
      name: $localize`Add date (old)`,
      value: 2,
    },
    {
      name: $localize`Resolution (large)`,
      value: 3,
    },
    {
      name: $localize`Resolution (small)`,
      value: 4,
    },
    {
      name: $localize`Filesize (large)`,
      value: 5,
    },
    {
      name: $localize`Filesize (small)`,
      value: 6,
    },
    {
      name: $localize`Commented`,
      value: 7,
    },
    {
      name: $localize`Views`,
      value: 8,
    },
    {
      name: $localize`Moderator votes`,
      value: 9,
    },
    {
      name: $localize`Removing date`,
      value: 11,
    },
    {
      name: $localize`Likes`,
      value: 12,
    },
    {
      name: $localize`Dislikes`,
      value: 13,
    },
  ];
  protected order: number = 0;

  protected similar = false;
  protected gps = false;
  protected lost = false;
  protected specialName = false;

  protected ownerID: number = 0;
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
              this.toastService.handleError(err);
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
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items || []),
          );
      }),
    );

  protected itemID: number = 0;
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

        const params = new ListItemsRequest({
          fields: new ItemFields({
            nameHtml: true,
            nameText: true,
          }),
          language: this.languageService.language,
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
            this.toastService.handleError(err);
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

  protected excludeItemID: number = 0;
  protected excludeItemQuery = '';

  protected readonly data$: Observable<{
    chunks: APIPicture[][];
    paginator: APIPaginator;
    pictures: APIPicture[];
  }> = this.route.queryParamMap.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    // eslint-disable-next-line sonarjs/cognitive-complexity
    switchMap((params) => {
      this.addedFrom = params.get('added_from') ? params.get('added_from') : null;
      this.status = params.get('status') ? params.get('status') : null;
      this.vehicleTypeID = params.get('vehicle_type_id') ? parseInt(params.get('vehicle_type_id') ?? '', 10) : null;
      const perspectiveID = params.get('perspective_id');
      this.perspectiveID = (perspectiveID === 'null' ? 'null' : parseInt(perspectiveID ?? '', 10)) ?? null;
      this.itemID = params.get('item_id') ? parseInt(params.get('item_id') ?? '', 10) : 0;
      if (this.itemID && !this.itemQuery) {
        this.itemQuery = '#' + this.itemID;
      }
      this.excludeItemID = params.get('exclude_item_id') ? parseInt(params.get('exclude_item_id') ?? '', 10) : 0;
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
      this.ownerID = parseInt(params.get('owner_id') ?? '', 10);
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
      this.gps = !!params.get('gps');
      this.similar = !!params.get('similar');
      this.order = params.get('order') ? parseInt(params.get('order') ?? '', 10) : 1;
      this.addedFrom = params.get('added_from') ?? '';

      this.selected = [];
      this.hasSelectedItem = false;
      const qParams: APIGetPicturesOptions = {
        added_from: this.addedFrom ? this.addedFrom : undefined,
        car_type_id: this.vehicleTypeID ? this.vehicleTypeID : undefined,
        comments: this.comments,
        exclude_item_id: this.excludeItemID,
        fields: 'owner,thumb_medium,moder_vote,votes,similar,views,comments_count,perspective_item,name_html,name_text',
        gps: this.gps,
        item_id: this.itemID,
        limit: 18,
        lost: this.lost,
        order: this.order,
        owner_id: this.ownerID ? this.ownerID.toString() : undefined,
        page: parseInt(params.get('page') ?? '', 10),
        perspective_id: this.perspectiveID,
        replace: this.replace,
        requests: this.requests,
        similar: this.similar,
        special_name: this.specialName,
        status: this.status ? this.status : undefined,
      };

      return this.change$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$(qParams).pipe(
            catchError((response: unknown) => {
              this.toastService.handleError(response);
              return EMPTY;
            }),
          ),
        ),
      );
    }),
    map((response) => ({
      chunks: chunkBy<APIPicture>(response.pictures, 3),
      paginator: response.paginator,
      pictures: response.pictures,
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

  protected onPictureSelect(active: boolean, picture: APIPicture) {
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

  protected votePictures(pictures: APIPicture[], vote: number, reason: string) {
    for (const id of this.selected) {
      const promises: Observable<Empty>[] = [];
      for (const picture of pictures) {
        if (picture.id === id) {
          const q$ = this.moderVoteService.vote$('' + picture.id, vote, reason);
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

  protected acceptPictures(pictures: APIPicture[]) {
    for (const id of this.selected) {
      const promises: Observable<void>[] = [];
      for (const picture of pictures) {
        if (picture.id === id) {
          promises.push(
            this.picturesClient
              .setPictureStatus(
                new SetPictureStatusRequest({id: picture.id + '', status: PictureStatus.PICTURE_STATUS_ACCEPTED}),
              )
              .pipe(
                catchError((err: unknown) => {
                  this.toastService.handleError(err);
                  return EMPTY;
                }),
                tap(() => (picture.status = 'accepted')),
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
}
