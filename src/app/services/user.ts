import {Injectable} from '@angular/core';
import {APIPaginator, APIImage, APIService} from './api.service';
import {Observable, forkJoin, of} from 'rxjs';
import {APIAccount} from '../account/account.service';
import {tap, map, shareReplay} from 'rxjs/operators';
import {UsersClient} from '@grpc/spec.pbsc';
import {APIGetUserRequest, APIUser as APIUser2} from '@grpc/spec.pb';

export interface APIGetUserOptions {
  fields?: string;
}

export interface APIGetUsersOptions {
  limit?: number;
  id?: (number | string)[];
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
}

function convertUserOptions(options: APIGetUserOptions): {[param: string]: string} {
  const params: {[param: string]: string} = {};

  if (options.fields) {
    params.fields = options.fields;
  }

  return params;
}

function convertUsersOptions(options: APIGetUsersOptions): {[param: string]: string | string[]} {
  const params: {[param: string]: string | string[]} = {};

  if (options.limit) {
    params.limit = options.limit.toString();
  }

  if (options.id) {
    params['id[]'] = options.id.map((id) => id.toString());
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
  private cache: Map<string, APIUser> = new Map<string, APIUser>();
  private promises = new Map<string, Observable<null>>();

  private cache2 = new Map<string, Observable<APIUser2>>();

  constructor(private readonly api: APIService, private readonly usersClient: UsersClient) {}

  private queryUsers$(ids: string[]): Observable<null> {
    const toRequest: string[] = [];
    const waitFor: Observable<null>[] = [];
    for (const id of ids) {
      const oldUser = this.cache.get(id);
      if (oldUser !== undefined) {
        continue;
      }
      const oldPromise$ = this.promises.get(id);
      if (oldPromise$ !== undefined) {
        waitFor.push(oldPromise$);
        continue;
      }
      toRequest.push(id);
    }

    if (toRequest.length > 0) {
      const promise$: Observable<null> = this.get$({
        id: toRequest,
        limit: toRequest.length,
      }).pipe(
        tap((response) => {
          for (const item of response.items) {
            this.cache.set(item.id.toString(), item);
          }
        }),
        map(() => null)
      );

      waitFor.push(promise$);

      for (const id of toRequest) {
        this.promises.set(id, promise$);
      }
    }

    if (waitFor.length <= 0) {
      return of(null);
    }

    return forkJoin(waitFor).pipe(map(() => null));
  }

  public getUsers$(ids: string[]): Observable<APIUser[]> {
    return this.queryUsers$(ids).pipe(
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

  public getUserMap$(ids: string[]): Observable<Map<string, APIUser>> {
    return this.queryUsers$(ids).pipe(
      map(() => {
        const result = new Map<string, APIUser>();
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

  public getUser$(id: number, options: APIGetUserOptions): Observable<APIUser> {
    const params = convertUserOptions(options);

    if (Object.keys(params).length) {
      return this.api.request<APIUser>('GET', 'user/' + id, {
        params,
      });
    }

    return this.getUsers$([id.toString()]).pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0];
        }
        return null as APIUser;
      })
    );
  }

  public getUser2$(id: string) {
    if (!id) {
      return of(null);
    }

    if (!this.cache2.has(id)) {
      const o$ = this.usersClient.getUser(new APIGetUserRequest({userId: id})).pipe(shareReplay(1));
      this.cache2.set(id, o$);
    }

    return this.cache2.get(id);
  }

  public get$(options?: APIGetUsersOptions): Observable<APIUserGetResponse> {
    return this.api.request<APIUserGetResponse>('GET', 'user', {
      params: convertUsersOptions(options),
    });
  }

  public getByIdentity$(identity: string, options: APIGetUserOptions): Observable<APIUser> {
    const result = identity.match(/^user([0-9]+)$/);

    if (result) {
      return this.getUser$(parseInt(result[1], 10), options);
    }

    const params: APIGetUsersOptions = {
      identity,
      limit: 1,
      fields: options.fields,
    };

    return this.get$(params).pipe(map((response) => (response.items.length ? response.items[0] : null)));
  }
}
