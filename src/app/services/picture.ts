import {inject, Injectable} from '@angular/core';
import {PictureListOptions, PicturesRequest, PictureStatus, PicturesUserSummary} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {ACLService, Privilege, Resource} from './acl.service';
import {APIImage, APIService} from './api.service';
import {AuthService} from './auth.service';
import {APIItem} from './item';
import {APIPictureItem} from './picture-item';

export const perspectiveIDLogotype = 22,
  perspectiveIDMixed = 25;

export interface APIPicture {
  authors?: {
    id: number;
    name: string;
  }[];
  categories?: APIItem[];
  comments_count: {
    new: number;
    total: number;
  };
  copyrights: string;
  crop: {
    height: null | number;
    left: null | number;
    top: null | number;
    width: null | number;
  };
  crop_resolution: string;
  cropped: boolean;
  exif: string;
  factories?: APIItem[];
  filesize: number;
  height: number;
  id: number;
  identity: string;
  image: APIImage;
  ip: string;
  items: APIPictureItem[];
  moder_vote: {
    count: number;
    vote: number;
  };
  name_html: string;
  name_text: string;
  owner_id: null | string;
  paginator?: APIPicturePaginator;
  perspective_item: {
    item_id: number;
    perspective_id: number;
    type: number;
  };
  point?: {
    lat: number;
    lng: number;
  };
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
  status: string;
  subscribed?: boolean;
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

export interface APIPictureVotes {
  negative: number;
  positive: number;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private readonly api = inject(APIService);
  private readonly auth = inject(AuthService);
  private readonly acl = inject(ACLService);
  private readonly picturesClient = inject(PicturesClient);

  public readonly summary$: Observable<null | PicturesUserSummary> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        return of(null);
      }
      return this.picturesClient.getUserSummary(new Empty());
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  public readonly inboxSize$: Observable<null | number> = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE).pipe(
    switchMap((isModer) => {
      if (!isModer) {
        return of(null);
      }

      return this.picturesClient
        .getPicturesPaginator(
          new PicturesRequest({
            limit: 0,
            options: new PictureListOptions({
              status: PictureStatus.PICTURE_STATUS_INBOX,
            }),
            paginator: true,
          }),
        )
        .pipe(map((paginator) => paginator.totalItemCount || null));
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  public getCanonicalRoute$(identity: string): Observable<null | string[]> {
    return this.api.request$<null | string[]>('GET', 'picture/' + identity + '/canonical-route');
  }
}
