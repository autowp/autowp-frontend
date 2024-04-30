import {Injectable} from '@angular/core';
import {APIGetUserRequest, APIUser as APIUser2} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {Observable, forkJoin, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {APIAccount} from '../account/account.service';
import {APIImage, APIPaginator, APIService} from './api.service';

export interface APIGetUserOptions {
  fields?: string;
}

export interface APIGetUsersOptions {
  fields?: string;
  id?: (number | string)[];
  identity?: string;
  limit?: number;
  page?: number;
  search?: string;
}

export interface APIUserGetResponse {
  items: APIUser[];
  paginator: APIPaginator;
}

export interface APIUser {
  accounts: APIAccount[];
  avatar: APIImage;
  deleted: boolean;
  email: string;
  gravatar: string;
  gravatar_hash: string;
  green: boolean;
  id: number;
  identity: string;
  image: APIImage;
  img: APIImage;
  is_moder: boolean;
  language: string;
  last_ip: string;
  last_online: string;
  login: string;
  long_away: boolean;
  name: string;
  photo: APIImage | null;
  pictures_accepted_count: number;
  pictures_added: number;
  reg_date: string;
  role: string;
  route: string;
  specs_weight: number;
  timezone: string;
  votes_left: number;
  votes_per_day: number;
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

  private cache2 = new Map<string, Observable<APIUser2 | null>>();

  constructor(
    private readonly api: APIService,
    private readonly usersClient: UsersClient,
  ) {}

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
        map(() => null),
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
      }),
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
      }),
    );
  }

  public getUser$(id: number, options: APIGetUserOptions): Observable<APIUser | null> {
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
        return null;
      }),
    );
  }

  public getUser2$(id: string): Observable<APIUser2 | null> {
    if (!id) {
      return of(null);
    }

    const cached$ = this.cache2.get(id);
    if (cached$) {
      return cached$;
    }

    const o$ = this.usersClient.getUser(new APIGetUserRequest({userId: id})).pipe(
      map((user) => (user ? user : null)),
      shareReplay(1),
    );
    this.cache2.set(id, o$);

    return o$;
  }

  public get$(options?: APIGetUsersOptions): Observable<APIUserGetResponse> {
    return this.api.request<APIUserGetResponse>('GET', 'user', {
      params: convertUsersOptions(options ? options : {}),
    });
  }

  public getByIdentity$(identity: string, options: APIGetUserOptions): Observable<APIUser | null> {
    const result = identity.match(/^user([0-9]+)$/);

    if (result) {
      return this.getUser$(parseInt(result[1], 10), options);
    }

    const params: APIGetUsersOptions = {
      fields: options.fields,
      identity,
      limit: 1,
    };

    return this.get$(params).pipe(map((response) => (response.items.length ? response.items[0] : null)));
  }
}
