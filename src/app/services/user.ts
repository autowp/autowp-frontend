import { Injectable } from '@angular/core';
import { APIPaginator, APIImage, APIService } from './api.service';
import { Observable, forkJoin } from 'rxjs';
import { APIAccount } from '../account/account.service';
import { tap, map } from 'rxjs/operators';

export interface APIGetUserOptions {
  fields?: string;
}

export interface APIGetUsersOptions {
  limit?: number;
  id?: number[];
  search?: string;
  page?: number;
  fields?: string;
  identity?: string;
}

export interface APIUserGetResponse {
  paginator: APIPaginator;
  items: APIUser[];
}

export interface APIUser {
  id: number;
  name: string;
  email: string;
  identity: string;
  deleted: boolean;
  login: string;
  role: string;
  image: APIImage;
  last_online: string;
  reg_date: string;
  specs_weight: number;
  long_away: boolean;
  green: boolean;
  timezone: string;
  language: string;
  votes_per_day: number;
  votes_left: number;
  img: APIImage;
  avatar: APIImage;
  gravatar: string;
  gravatar_hash: string;
  route: string;
  last_ip: string;
  photo: APIImage;
  pictures_added: number;
  pictures_accepted_count: number;
  accounts: APIAccount[];
  is_moder: boolean;
  renames: {
    date: string;
    old_name: string;
  }[];
}

function converUserOptions(
  options: APIGetUserOptions
): { [param: string]: string } {
  const params: { [param: string]: string } = {};

  if (options.fields) {
    params.fields = options.fields;
  }

  return params;
}

function converUsersOptions(
  options: APIGetUsersOptions
): { [param: string]: string | string[] } {
  const params: { [param: string]: string | string[] } = {};

  if (options.limit) {
    params.limit = options.limit.toString();
  }

  if (options.id) {
    const a: string[] = [];
    for (const id of options.id) {
      a.push(id.toString());
    }
    params['id[]'] = a;
  }

  if (options.search) {
    params.search = options.search;
  }

  if (options.page) {
    params.page = options.page.toString();
  }

  if (options.fields) {
    params.fields = options.fields;
  }

  if (options.identity) {
    params.identity = options.identity;
  }

  return params;
}

@Injectable()
export class UserService {
  private cache: Map<number, APIUser> = new Map<number, APIUser>();
  private promises = new Map<number, Observable<void>>();

  constructor(private api: APIService) {}

  private queryUsers(ids: number[]): Observable<any> {
    const toRequest: number[] = [];
    const waitFor: Observable<void>[] = [];
    for (const id of ids) {
      const oldUser = this.cache.get(id);
      if (oldUser !== undefined) {
        continue;
      }
      const oldPromise = this.promises.get(id);
      if (oldPromise !== undefined) {
        waitFor.push(oldPromise);
        continue;
      }
      toRequest.push(id);
    }

    if (toRequest.length > 0) {
      const promise = this.get({
        id: toRequest,
        limit: toRequest.length
      }).pipe(
        tap(response => {
          for (const item of response.items) {
            this.cache.set(item.id, item);
          }
        }),
        map(() => null)
      );

      waitFor.push(promise);

      for (const id of toRequest) {
        this.promises.set(id, promise);
      }
    }

    return forkJoin(waitFor);
  }

  public getUsers(ids: number[]): Observable<APIUser[]> {
    return this.queryUsers(ids).pipe(
      map(() => {
        const result: APIUser[] = [];
        for (const id of ids) {
          const user = this.cache.get(id);
          if (user === undefined) {
            throw new Error('Failed to query user ' + id);
          }
          result.push(user);
        }
        return result;
      })
    );
  }

  public getUserMap(ids: number[]): Observable<Map<number, APIUser>> {
    return this.queryUsers(ids).pipe(
      map(() => {
        const result = new Map<number, APIUser>();
        for (const id of ids) {
          const user = this.cache.get(id);
          if (user === undefined) {
            throw new Error('Failed to query user ' + id);
          }
          result.set(id, user);
        }
        return result;
      })
    );
  }

  public getUser(id: number, options: APIGetUserOptions): Observable<APIUser> {
    const params = converUserOptions(options);

    if (Object.keys(params).length) {
      return this.api.request<APIUser>('GET', 'user/' + id, {
        params
      });
    }

    return this.getUsers([id]).pipe(
      map(users => {
        if (users.length > 0) {
          return users[0];
        }
        return null as APIUser;
      })
    );
  }

  public get(options?: APIGetUsersOptions): Observable<APIUserGetResponse> {
    return this.api.request<APIUserGetResponse>('GET', 'user', {
      params: converUsersOptions(options)
    });
  }

  public getByIdentity(
    identity: string,
    options: APIGetUserOptions
  ): Observable<APIUser> {
    const result = identity.match(/^user([0-9]+)$/);

    if (result) {
      return this.getUser(parseInt(result[1], 10), options);
    }

    const params: APIGetUsersOptions = {
      identity,
      limit: 1,
      fields: options.fields
    };

    return this.get(params).pipe(
      map(response => (response.items.length ? response.items[0] : null))
    );
  }
}
