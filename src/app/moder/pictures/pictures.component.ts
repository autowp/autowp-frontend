import {Component, OnInit, OnDestroy} from '@angular/core';
import {APIPaginator, APIService} from '@services/api.service';
import {PictureModerVoteService} from '@services/picture-moder-vote';
import {VehicleTypeService} from '@services/vehicle-type';
import {ItemService, GetItemsServiceOptions, APIItem} from '@services/item';
import {chunkBy} from '../../chunk';
import {UserService, APIUser} from '@services/user';
import {Subscription, Observable, of, forkJoin, BehaviorSubject, EMPTY} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {APIPicture, PictureService, APIGetPicturesOptions} from '@services/picture';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, map, switchMap, catchError, tap, distinctUntilChanged, shareReplay} from 'rxjs/operators';
import {PageEnvService} from '@services/page-env.service';
import {APIPerspectiveService} from '../../api/perspective/perspective.service';
import {getPerspectiveTranslation, getVehicleTypeTranslation} from '@utils/translations';
import {VehicleType} from '@grpc/spec.pb';
import {ToastsService} from '../../toasts/toasts.service';
import {APIPictureModerVoteTemplateService} from '../../api/picture-moder-vote-template/picture-moder-vote-template.service';

interface VehicleTypeInPictures {
  name: string;
  value: number;
  deep: number;
}

interface PerspectiveInList {
  name: string;
  value: number | null | 'null';
}

function toPlainVehicleTypes(options: VehicleType[], deep: number): VehicleTypeInPictures[] {
  const result: VehicleTypeInPictures[] = [];
  for (const item of options) {
    result.push({
      name: getVehicleTypeTranslation(item.name),
      value: item.id,
      deep,
    });
    for (const subitem of toPlainVehicleTypes(item.childs, deep + 1)) {
      result.push(subitem);
    }
  }
  return result;
}

@Component({
  selector: 'app-moder-pictures',
  templateUrl: './pictures.component.html',
})
export class ModerPicturesComponent implements OnInit, OnDestroy {
  protected hasSelectedItem = false;
  private selected: number[] = [];

  protected status: string | null;
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
      name: $localize`any`,
      value: null,
      deep: 0,
    },
  ];
  protected vehicleTypeID: number | null;

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
          value: perspective.id,
          name: getPerspectiveTranslation(perspective.name),
        }))
      )
    ),
    shareReplay(1)
  );

  protected perspectiveID: number | null | 'null';

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
  protected comments: boolean | null;

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
  protected replace: boolean | null;

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
  protected requests: number | null;

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
  protected order: number;

  protected similar = false;
  protected gps = false;
  protected lost = false;
  protected specialName = false;

  protected ownerID: number;
  protected ownerQuery = '';
  protected ownersDataSource: (text$: Observable<string>) => Observable<any[]>;

  protected itemID: number;
  protected itemQuery = '';
  protected itemsDataSource: (text$: Observable<string>) => Observable<any[]>;

  protected readonly vehicleTypeOptions$ = this.vehicleTypeService.getTypes$().pipe(
    map((types) => this.defaultVehicleTypeOptions.concat(toPlainVehicleTypes(types, 0))),
    shareReplay(1)
  );

  private readonly change$ = new BehaviorSubject<null>(null);

  protected addedFrom: string;
  private readonly addedFrom$ = new BehaviorSubject<string>('');
  private addedFromSub: Subscription;

  protected excludeItemID: number;
  protected excludeItemQuery = '';

  protected readonly data$: Observable<{
    pictures: APIPicture[];
    chunks: APIPicture[][];
    paginator: APIPaginator;
  }> = this.route.queryParamMap.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((params) => {
      this.addedFrom = params.get('added_from') ? params.get('added_from') : null;
      this.status = params.get('status') ? params.get('status') : null;
      this.vehicleTypeID = params.get('vehicle_type_id') ? parseInt(params.get('vehicle_type_id'), 10) : null;
      this.perspectiveID = params.get('perspective_id')
        ? params.get('perspective_id') === 'null'
          ? 'null'
          : parseInt(params.get('perspective_id'), 10)
        : null;
      this.itemID = params.get('item_id') ? parseInt(params.get('item_id'), 10) : 0;
      if (this.itemID && !this.itemQuery) {
        this.itemQuery = '#' + this.itemID;
      }
      this.excludeItemID = params.get('exclude_item_id') ? parseInt(params.get('exclude_item_id'), 10) : 0;
      if (this.excludeItemID && !this.excludeItemQuery) {
        this.excludeItemQuery = '#' + this.excludeItemID;
      }
      switch (params.get('comments')) {
        case 'true':
          this.comments = true;
          break;
        case 'false':
          this.comments = false;
          break;
        default:
          this.comments = null;
          break;
      }
      this.ownerID = parseInt(params.get('owner_id'), 10);
      if (this.ownerID && !this.ownerQuery) {
        this.ownerQuery = '#' + this.ownerID;
      }
      switch (params.get('replace')) {
        case 'true':
          this.replace = true;
          break;
        case 'false':
          this.replace = false;
          break;
        default:
          this.replace = null;
          break;
      }
      this.requests = params.get('requests') ? parseInt(params.get('requests'), 10) : null;
      this.specialName = !!params.get('special_name');
      this.lost = !!params.get('lost');
      this.gps = !!params.get('gps');
      this.similar = !!params.get('similar');
      this.order = params.get('order') ? parseInt(params.get('order'), 10) : 1;
      this.addedFrom = params.get('added_from') || '';

      this.selected = [];
      this.hasSelectedItem = false;
      const qParams: APIGetPicturesOptions = {
        status: this.status,
        car_type_id: this.vehicleTypeID,
        perspective_id: this.perspectiveID,
        item_id: this.itemID,
        exclude_item_id: this.excludeItemID,
        owner_id: this.ownerID ? this.ownerID.toString() : null,
        requests: this.requests,
        special_name: this.specialName,
        lost: this.lost,
        gps: this.gps,
        similar: this.similar,
        added_from: this.addedFrom ? this.addedFrom : null,
        order: this.order,
        page: parseInt(params.get('page'), 10),
        comments: this.comments,
        replace: this.replace,
        fields: 'owner,thumb_medium,moder_vote,votes,similar,views,comments_count,perspective_item,name_html,name_text',
        limit: 18,
      };

      return this.change$.pipe(
        switchMap(() =>
          this.pictureService.getPictures$(qParams).pipe(
            catchError((response: unknown) => {
              this.toastService.handleError(response);
              return EMPTY;
            })
          )
        )
      );
    }),
    map((response) => ({
      pictures: response.pictures,
      chunks: chunkBy<APIPicture>(response.pictures, 3),
      paginator: response.paginator,
    })),
    shareReplay(1)
  );

  protected readonly moderVoteTemplateOptions$ = this.moderVoteTemplateService.getTemplates$().pipe(shareReplay(1));

  constructor(
    private readonly api: APIService,
    private readonly perspectiveService: APIPerspectiveService,
    private readonly moderVoteService: PictureModerVoteService,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly itemService: ItemService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly pictureService: PictureService,
    private readonly router: Router,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly moderVoteTemplateService: APIPictureModerVoteTemplateService
  ) {
    this.ownersDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap((query) => {
          if (query === '') {
            return of([]);
          }

          const params = {
            limit: 10,
            id: [],
            search: '',
          };
          if (query.substring(0, 1) === '#') {
            params.id.push(parseInt(query.substring(1), 10));
          } else {
            params.search = query;
          }

          return this.userService.get$(params).pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items)
          );
        })
      );

    this.itemsDataSource = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        switchMap((query) => {
          if (query === '') {
            return of([]);
          }

          const params: GetItemsServiceOptions = {
            limit: 10,
            fields: 'name_text,name_html',
            id: 0,
            name: '',
          };
          if (query.substring(0, 1) === '#') {
            params.id = parseInt(query.substring(1), 10);
          } else {
            params.name = '%' + query + '%';
          }

          return this.itemService.getItems$(params).pipe(
            catchError((err: unknown) => {
              this.toastService.handleError(err);
              return EMPTY;
            }),
            map((response) => response.items)
          );
        })
      );
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 73,
        }),
      0
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
    this.addedFromSub.unsubscribe();
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
    return x.name_text;
  }

  protected ownerFormatter(x: APIUser) {
    return x.name;
  }

  protected itemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        item_id: e.item.id,
      },
    });
  }

  protected excludeItemOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        exclude_item_id: e.item.id,
      },
    });
  }

  protected clearItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        item_id: null,
      },
    });
  }

  protected clearExcludeItem(): void {
    this.itemQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        exclude_item_id: null,
      },
    });
  }

  protected ownerOnSelect(e: NgbTypeaheadSelectItemEvent): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        owner_id: e.item.id,
      },
    });
  }

  protected clearOwner(): void {
    this.ownerQuery = '';
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        owner_id: null,
      },
    });
  }

  protected votePictures(pictures: APIPicture[], vote: number, reason: string) {
    for (const id of this.selected) {
      const promises: Observable<void>[] = [];
      for (const picture of pictures) {
        if (picture.id === id) {
          const q$ = this.moderVoteService.vote$(picture.id, vote, reason);
          promises.push(q$);
        }
      }

      forkJoin(promises).subscribe(() => {
        this.change$.next(null);
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
            this.api
              .request<void>('PUT', 'picture/' + picture.id, {
                body: {
                  status: 'accepted',
                },
              })
              .pipe(tap(() => (picture.status = 'accepted')))
          );
        }
      }

      forkJoin(promises).subscribe(() => {
        this.change$.next(null);
      });
    }
    this.selected = [];
    this.hasSelectedItem = false;
  }

  protected onAddedFromInput() {
    this.addedFrom$.next(this.addedFrom);
  }
}
