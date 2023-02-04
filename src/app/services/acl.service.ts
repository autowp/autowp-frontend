import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';
import {AutowpClient} from '@grpc/spec.pbsc';
import {AclEnforceRequest} from '@grpc/spec.pb';

export enum Privilege {
  EDIT = 'edit',
  EDIT_META = 'edit_meta',
  REMOVE = 'remove',
  MANAGE = 'manage',
  VIEW = 'view',
  RESOTRE = 'restore',
  UNACCEPT = 'unaccept',
  FLOP = 'flop',
  NORMALIZE = 'normalize',
  ADMIN = 'admin',
  EDIT_ENGINE = 'edit-engine',
  BAN = 'ban',
  DELETE = 'delete',
  LOGO = 'logo',
  ADD = 'add',
  MOVE = 'move',
  MODERATE = 'moderate',
  BE_GREEN = 'be-green',
  UNLIMITED_TRAFFIC = 'unlimited-traffic',
  IP = 'ip',
  REMOVE_BY_VOTE = 'remove_by_vote',
  ACCEPT = 'accept',
  CROP = 'crop',
  MODER_VOTE = 'moder_vote',
  MODERATOR_ATTENTION = 'moderator-attention',
}

export enum Resource {
  ATTRS = 'attrs',
  CAR = 'car',
  COMMENT = 'comment',
  HOTLINKS = 'hotlinks',
  PICTURE = 'picture',
  RIGHTS = 'rights',
  SPECIFICATIONS = 'specifications',
  USER = 'user',
  BRAND = 'brand',
  FORUMS = 'forums',
  STATUS = 'status',
  GLOBAL = 'global',
  PAGES = 'pages',
}

@Injectable()
export class APIACL {
  constructor(private grpc: AutowpClient) {}

  public isAllowed$(resource: Resource, privilege: Privilege): Observable<boolean> {
    return this.grpc.aclEnforce(new AclEnforceRequest({resource, privilege})).pipe(
      map((response) => response.result),
      catchError(() => {
        return of(false);
      })
    );
  }
}

@Injectable()
export class ACLService {
  private isAllowedCache = new Map<string, Observable<boolean>>();

  constructor(private apiACL: APIACL, private auth: AuthService) {}

  public isAllowed$(resource: Resource, privilege: Privilege): Observable<boolean> {
    const key = resource + '/' + privilege;

    if (this.isAllowedCache.has(key)) {
      return this.isAllowedCache.get(key);
    }

    const o$ = this.auth.getUser$().pipe(
      switchMap(() => this.apiACL.isAllowed$(resource, privilege)),
      shareReplay(1)
    );
    this.isAllowedCache.set(key, o$);
    return o$;
  }
}
