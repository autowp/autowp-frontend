import {APIPaginator, APIImage, APIService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {APIUser} from './user';
import {APIPictureItem} from './picture-item';
import {switchMap, shareReplay, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ACLService, Privilege, Resource} from './acl.service';
import {APIItem, APIPathTreeItem} from './item';
import {PicturesClient} from '@grpc/spec.pbsc';
import {PicturesVoteRequest, PicturesVoteSummary} from '@grpc/spec.pb';

export interface APIPictureGetResponse {
  pictures: APIPicture[];
  paginator: APIPaginator;
}

export interface APIPictureVotes {
  positive: number;
  negative: number;
  value: number;
}

export interface APIPathTreePictureItem {
  type: number;
  perspective_id?: number;
  item: APIPathTreeItem;
}

export interface APIPicture {
  id: number;
  identity: string;
  crop: {
    left: number | null;
    top: number | null;
    width: number | null;
    height: number | null;
  };
  thumb_medium: APIImage;
  perspective_item: {
    item_id: number;
    type: number;
    perspective_id: number;
  };
  url: string;
  status: string;
  cropped: boolean;
  name_html: string;
  name_text: string;
  resolution: string;
  views: number;
  comments_count: {
    total: number;
    new: number;
  };
  votes: APIPictureVotes;
  owner: APIUser;
  crop_resolution: string;
  similar: {
    distance: number;
    picture_id: number;
    picture: APIPicture;
  };
  image_gallery_full: APIImage;
  width: number;
  height: number;
  thumb: APIImage;
  items: APIPictureItem[];
  special_name: string;
  copyrights: string;
  name: string;
  image: APIImage;
  moder_voted: boolean;
  moder_votes: APIPictureModerVote[];
  is_last: boolean;
  accepted_count: number;
  siblings: {
    prev: APIPicture;
    prev_new: APIPicture;
    next_new: APIPicture;
    next: APIPicture;
  };
  dpi_x: number;
  dpi_y: number;
  filesize: number;
  rights: {
    crop: boolean;
    move: boolean;
    accept: boolean;
    delete: boolean;
    unaccept: boolean;
    restore: boolean;
    normalize: boolean;
    flop: boolean;
  };
  copyrights_text_id: number;
  exif: string;
  replaceable: APIPicture;
  change_status_user: APIUser;
  ip: string;
  add_date: string;
  moder_vote: {
    vote: number;
    count: number;
  };
  preview_large: APIImage;
  point?: {
    lat: number;
    lng: number;
  };
  authors?: {
    id: number;
    name: string;
  }[];
  categories?: APIItem[];
  twins?: APIItem[];
  factories?: APIItem[];
  copyright_blocks?: APIItem[];
  subscribed?: boolean;
  of_links?: {
    id: number;
    url: string;
    name: string;
    type_id: string;
  }[];
  paginator?: APIPicturePaginator;
  path: APIPathTreePictureItem[];
  taken_year?: number;
  taken_month?: number;
  taken_day?: number;
  taken_date?: string;
}

export interface APIPicturePaginator {
  pageCount: number;
  itemCountPerPage: number;
  first: string;
  current: string;
  last: string;
  previous: string;
  next: string;
  pagesInRange: {
    page: number;
    identity: string;
  }[];
  firstPageInRange: number;
  lastPageInRange: number;
  currentItemCount: number;
  totalItemCount: number;
  firstItemNumber: number;
  lastItemNumber: number;
}

export interface APIPictureModerVote {
  user: APIUser;
  vote: number;
  reason: string;
}

export interface APIGetPictureOptions {
  fields?: string;
}

export interface APIGetPicturesOptions {
  identity?: string;
  fields?: string;
  status?: string;
  limit?: number;
  page?: number;
  perspective_id?: number | null | 'null';
  perspective_exclude_id?: string;
  order?: number;
  exact_item_id?: number;
  item_id?: number;
  exclude_item_id?: number;
  add_date?: string;
  car_type_id?: number;
  comments?: null | boolean;
  owner_id?: string;
  replace?: null | boolean;
  requests?: null | number;
  special_name?: boolean;
  lost?: boolean;
  gps?: boolean;
  similar?: boolean;
  accept_date?: string;
  exact_item_link_type?: number;
  added_from?: string;
  items?: {
    type_id?: number;
  };
  paginator?: {
    item_id?: number;
    exact?: boolean;
    exact_item_id?: number;
    exact_item_link_type?: number;
    perspective_id?: number;
    perspective_exclude_id?: string;
  };
  accepted_in_days?: number;
}

export interface APIPictureUserSummary {
  inboxCount: number;
  acceptedCount: number;
}

function convertPictureOptions(options: APIGetPictureOptions): {[param: string]: string} {
  const params: {[param: string]: string} = {};

  if (!options) {
    options = {};
  }

  if (options.fields) {
    params.fields = options.fields;
  }

  return params;
}

function converPicturesOptions(options: APIGetPicturesOptions): {[param: string]: string} {
  const params: {[param: string]: string} = {};

  if (options.identity) {
    params.identity = options.identity;
  }

  if (options.fields) {
    params.fields = options.fields;
  }

  if (options.status) {
    params.status = options.status;
  }

  if (options.limit) {
    params.limit = options.limit.toString();
  }

  if (options.page) {
    params.page = options.page.toString();
  }

  if (options.perspective_id) {
    params.perspective_id = options.perspective_id.toString();
  }

  if (options.perspective_exclude_id) {
    params.perspective_exclude_id = options.perspective_exclude_id.toString();
  }

  if (options.order) {
    params.order = options.order.toString();
  }

  if (options.exact_item_id) {
    params.exact_item_id = options.exact_item_id.toString();
  }

  if (options.item_id) {
    params.item_id = options.item_id.toString();
  }

  if (options.exclude_item_id) {
    params.exclude_item_id = options.exclude_item_id.toString();
  }

  if (options.add_date) {
    params.add_date = options.add_date;
  }

  if (options.car_type_id) {
    params.car_type_id = options.car_type_id.toString();
  }

  if (options.comments !== null && options.comments !== undefined) {
    params.comments = options.comments ? '1' : '0';
  }

  if (options.replace !== null && options.replace !== undefined) {
    params.replace = options.replace ? '1' : '0';
  }

  if (options.owner_id) {
    params.owner_id = options.owner_id;
  }

  if (options.requests !== null && options.requests !== undefined) {
    params.requests = options.requests.toString();
  }

  if (options.special_name !== null && options.special_name !== undefined) {
    params.special_name = options.special_name ? '1' : '0';
  }

  if (options.lost !== null && options.lost !== undefined) {
    params.lost = options.lost ? '1' : '0';
  }

  if (options.gps !== null && options.gps !== undefined) {
    params.gps = options.gps ? '1' : '0';
  }

  if (options.similar) {
    params.similar = '1';
  }

  if (options.accept_date) {
    params.accept_date = options.accept_date;
  }

  if (options.exact_item_link_type) {
    params.exact_item_link_type = options.exact_item_link_type.toString();
  }

  if (options.added_from) {
    params.added_from = options.added_from;
  }

  if (options.accepted_in_days) {
    params.accepted_in_days = options.accepted_in_days.toString();
  }

  if (options.items) {
    if (options.items.type_id) {
      params['items[type_id]'] = options.items.type_id.toString();
    }
  }

  if (options.paginator) {
    if (options.paginator.item_id) {
      params['paginator[item_id]'] = options.paginator.item_id.toString();
    }
    if (options.paginator.exact_item_id) {
      params['paginator[exact_item_id]'] = options.paginator.exact_item_id.toString();
    }
    if (options.paginator.exact_item_link_type) {
      params['paginator[exact_item_link_type]'] = options.paginator.exact_item_link_type.toString();
    }
    if (options.paginator.perspective_id) {
      params['paginator[perspective_id]'] = options.paginator.perspective_id.toString();
    }

    if (options.paginator.perspective_exclude_id) {
      params['paginator[perspective_exclude_id]'] = options.paginator.perspective_exclude_id;
    }
  }

  return params;
}

@Injectable()
export class PictureService {
  private readonly summary$: Observable<APIPictureUserSummary>;
  private readonly inboxSize$: Observable<number>;

  constructor(
    private api: APIService,
    private auth: AuthService,
    private acl: ACLService,
    private pictures: PicturesClient
  ) {
    this.summary$ = this.auth.getUser().pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        return this.api.request<APIPictureUserSummary>('GET', 'picture/user-summary');
      }),
      shareReplay(1)
    );

    this.inboxSize$ = this.acl.isAllowed(Resource.GLOBAL, Privilege.MODERATE).pipe(
      switchMap((isModer) => {
        if (!isModer) {
          return of(null as number);
        }

        return this.getPictures({
          status: 'inbox',
          limit: 0,
        }).pipe(map((response) => response.paginator.totalItemCount));
      }),
      shareReplay(1)
    );
  }

  public getPictureByLocation(url: string, options?: APIGetPictureOptions): Observable<APIPicture> {
    return this.api.request<APIPicture>('GET', this.api.resolveLocation(url), {
      params: convertPictureOptions(options),
    });
  }

  public getPicture(id: number, options?: APIGetPictureOptions): Observable<APIPicture> {
    return this.api.request<APIPicture>('GET', 'picture/' + id, {
      params: convertPictureOptions(options),
    });
  }

  public getCanonicalRoute(identity: string): Observable<string[] | null> {
    return this.api.request<string[] | null>('GET', 'picture/' + identity + '/canonical-route');
  }

  public getPictures(options?: APIGetPicturesOptions): Observable<APIPictureGetResponse> {
    return this.api.request<APIPictureGetResponse>('GET', 'picture', {
      params: converPicturesOptions(options),
    });
  }

  public getSummary(): Observable<APIPictureUserSummary> {
    return this.summary$;
  }

  public getInboxSize(): Observable<number> {
    return this.inboxSize$;
  }

  public vote(pictureID: number, value: number): Observable<PicturesVoteSummary> {
    return this.pictures.vote(
      new PicturesVoteRequest({
        pictureId: pictureID.toString(),
        value,
      })
    );
  }

  public setPictureStatus(id: number, status: string): Observable<void> {
    return this.api.request<void>('PUT', 'picture/' + id.toString(), {
      body: {
        status,
      },
    });
  }
}
