import {inject, Injectable} from '@angular/core';
import {PicturesUserSummary, PicturesVoteRequest, PicturesVoteSummary} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {ACLService, Privilege, Resource} from './acl.service';
import {APIImage, APIPaginator, APIService} from './api.service';
import {AuthService} from './auth.service';
import {APIItem, APIPathTreeItem} from './item';
import {APIPictureItem} from './picture-item';

export interface APIPictureGetResponse {
  paginator: APIPaginator;
  pictures: APIPicture[];
}

export interface APIPictureVotes {
  negative: number;
  positive: number;
  value: number;
}

export interface APIPathTreePictureItem {
  item: APIPathTreeItem;
  perspective_id?: number;
  type: number;
}

export interface APIPicture {
  accepted_count: number;
  add_date: string;
  authors?: {
    id: number;
    name: string;
  }[];
  categories?: APIItem[];
  change_status_user_id: null | string;
  comments_count: {
    new: number;
    total: number;
  };
  copyright_blocks?: APIItem[];
  copyrights: string;
  copyrights_text_id: number;
  crop: {
    height: null | number;
    left: null | number;
    top: null | number;
    width: null | number;
  };
  crop_resolution: string;
  cropped: boolean;
  dpi_x: number;
  dpi_y: number;
  exif: string;
  factories?: APIItem[];
  filesize: number;
  height: number;
  id: number;
  identity: string;
  image: APIImage;
  image_gallery_full: APIImage;
  ip: string;
  is_last: boolean;
  items: APIPictureItem[];
  moder_vote: {
    count: number;
    vote: number;
  };
  moder_voted: boolean;
  moder_votes: APIPictureModerVote[];
  name: string;
  name_html: string;
  name_text: string;
  of_links?: {
    id: number;
    name: string;
    type_id: string;
    url: string;
  }[];
  owner_id: null | string;
  paginator?: APIPicturePaginator;
  path: APIPathTreePictureItem[];
  perspective_item: {
    item_id: number;
    perspective_id: number;
    type: number;
  };
  point?: {
    lat: number;
    lng: number;
  };
  preview_large: APIImage;
  replaceable: APIPicture;
  resolution: string;
  rights: {
    accept: boolean;
    crop: boolean;
    delete: boolean;
    flop: boolean;
    move: boolean;
    normalize: boolean;
    restore: boolean;
    unaccept: boolean;
  };
  siblings: {
    next: APIPicture;
    next_new: APIPicture;
    prev: APIPicture;
    prev_new: APIPicture;
  };
  similar: {
    distance: number;
    picture: APIPicture;
    picture_id: number;
  };
  special_name: string;
  status: string;
  subscribed?: boolean;
  taken_date?: string;
  taken_day?: number;
  taken_month?: number;
  taken_year?: number;
  thumb: APIImage;
  thumb_medium: APIImage;
  twins?: APIItem[];
  url: string;
  views: number;
  votes: APIPictureVotes;
  width: number;
}

export interface APIPicturePaginator {
  current: string;
  currentItemCount: number;
  first: string;
  firstItemNumber: number;
  firstPageInRange: number;
  itemCountPerPage: number;
  last: string;
  lastItemNumber: number;
  lastPageInRange: number;
  next: string;
  pageCount: number;
  pagesInRange: {
    identity: string;
    page: number;
  }[];
  previous: string;
  totalItemCount: number;
}

export interface APIPictureModerVote {
  reason: string;
  user_id: number;
  vote: number;
}

export interface APIGetPictureOptions {
  fields?: string;
}

export interface APIGetPicturesOptions {
  accept_date?: string;
  accepted_in_days?: number;
  add_date?: string;
  added_from?: string;
  car_type_id?: number;
  comments?: boolean | null;
  exact_item_id?: number;
  exact_item_link_type?: number;
  exclude_item_id?: number;
  fields?: string;
  gps?: boolean;
  identity?: string;
  item_id?: number;
  items?: {
    type_id?: number;
  };
  limit?: number;
  lost?: boolean;
  order?: number;
  owner_id?: string;
  page?: number;
  paginator?: {
    exact?: boolean;
    exact_item_id?: number;
    exact_item_link_type?: number;
    item_id?: number;
    perspective_exclude_id?: string;
    perspective_id?: number;
  };
  perspective_exclude_id?: string;
  perspective_id?: 'null' | null | number;
  replace?: boolean | null;
  requests?: null | number;
  similar?: boolean;
  special_name?: boolean;
  status?: string;
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

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private readonly api = inject(APIService);
  private readonly auth = inject(AuthService);
  private readonly acl = inject(ACLService);
  private readonly pictures = inject(PicturesClient);

  public readonly summary$: Observable<null | PicturesUserSummary> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        return of(null);
      }
      return this.pictures.getUserSummary(new Empty());
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly inboxSize$: Observable<null | number> = this.acl
    .isAllowed$(Resource.GLOBAL, Privilege.MODERATE)
    .pipe(
      switchMap((isModer) => {
        if (!isModer) {
          return of(null);
        }

        return this.getPictures$({
          limit: 0,
          status: 'inbox',
        }).pipe(map((response) => response.paginator.totalItemCount));
      }),
      shareReplay({bufferSize: 1, refCount: false}),
    );

  public getPictureByLocation$(url: string, options?: APIGetPictureOptions): Observable<APIPicture> {
    return this.api.request<APIPicture>('GET', this.api.resolveLocation(url), {
      params: convertPictureOptions(options ? options : {}),
    });
  }

  public getPicture$(id: number, options?: APIGetPictureOptions): Observable<APIPicture> {
    return this.api.request<APIPicture>('GET', 'picture/' + id, {
      params: convertPictureOptions(options ? options : {}),
    });
  }

  public getCanonicalRoute$(identity: string): Observable<null | string[]> {
    return this.api.request<null | string[]>('GET', 'picture/' + identity + '/canonical-route');
  }

  public getPictures$(options?: APIGetPicturesOptions): Observable<APIPictureGetResponse> {
    return this.api.request<APIPictureGetResponse>('GET', 'picture', {
      params: converPicturesOptions(options ? options : {}),
    });
  }

  public getInboxSize$(): Observable<null | number> {
    return this.inboxSize$;
  }

  public vote$(pictureID: number, value: number): Observable<PicturesVoteSummary> {
    return this.pictures.vote(
      new PicturesVoteRequest({
        pictureId: pictureID.toString(),
        value,
      }),
    );
  }

  public setPictureStatus$(id: number, status: string): Observable<void> {
    return this.api.request<void>('PUT', 'picture/' + id.toString(), {
      body: {
        status,
      },
    });
  }
}
