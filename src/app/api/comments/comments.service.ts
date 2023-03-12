import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {APIPaginator, APIService} from '@services/api.service';
import {APIUser} from '@services/user';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';

export interface APICommentItemGetOptions {
  fields?: string;
  limit?: number;
}

export interface APICommentGetOptions {
  user_id?: number;
  type_id?: number;
  item_id?: number;
  no_parents?: boolean;
  limit: number;
  page?: number;
  order?: string;
  fields?: string[];
  user?: string | number;
  moderator_attention?: string;
  pictures_of_item_id?: number;
}

export interface APICommentGetResponse {
  items: APIComment[];
  paginator: APIPaginator;
}

export interface APIComment {
  id: number;
  item_id: number;
  page: number;
  deleted: boolean;
  user_vote: number;
  vote: number;
  replies: APIComment[];
  ip: string;
  text: string;
  user: APIUser;
  datetime: string;
  moderator_attention: number; // TODO: enum
  preview: string;
  is_new: boolean;
  route: string[];
  status: {
    class: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class APICommentsService {
  private readonly attentionCommentsCount$: Observable<number>;

  constructor(private acl: ACLService, private api: APIService) {
    this.attentionCommentsCount$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE).pipe(
      switchMap((isModer) => {
        if (!isModer) {
          return of(null as number);
        }

        return this.getComments$({
          moderator_attention: '1',
          limit: 0,
        }).pipe(map((response) => response.paginator.totalItemCount));
      }),
      shareReplay(1)
    );
  }

  public getComments$(options: APICommentGetOptions): Observable<APICommentGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.user_id) {
      params.user_id = options.user_id.toString();
    }

    if (options.type_id) {
      params.type_id = options.type_id.toString();
    }

    if (options.item_id) {
      params.item_id = options.item_id.toString();
    }

    if (options.no_parents) {
      params.no_parents = '1';
    }

    if (options.limit !== null && typeof options.limit !== 'undefined') {
      params.limit = options.limit.toString();
    }

    if (options.page) {
      params.page = options.page.toString();
    }

    if (options.order) {
      params.order = options.order;
    }

    if (options.fields) {
      params.fields = options.fields.join(',');
    }

    if (options.user) {
      params.user = options.user.toString();
    }

    if (options.moderator_attention) {
      params.moderator_attention = options.moderator_attention;
    }

    if (options.pictures_of_item_id) {
      params.pictures_of_item_id = options.pictures_of_item_id.toString();
    }

    return this.api.request<APICommentGetResponse>('GET', 'comment', {params});
  }

  public getComment$(id: number, options: APICommentItemGetOptions): Observable<APIComment> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    if (options.limit) {
      params.limit = options.limit.toString();
    }

    return this.api.request<APIComment>('GET', 'comment/' + id, {params});
  }

  public getAttentionCommentsCount$(): Observable<number> {
    return this.attentionCommentsCount$;
  }
}
