import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {AclEnforceRequest} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay, switchMap} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {isPlatformBrowser} from '@angular/common';

export enum Privilege {
  ACCEPT = 'accept',
  ADD = 'add',
  ADMIN = 'admin',
  BAN = 'ban',
  BE_GREEN = 'be-green',
  CROP = 'crop',
  DELETE = 'delete',
  EDIT = 'edit',
  EDIT_ENGINE = 'edit-engine',
  EDIT_META = 'edit_meta',
  FLOP = 'flop',
  IP = 'ip',
  LOGO = 'logo',
  MANAGE = 'manage',
  MODER_VOTE = 'moder_vote',
  MODERATE = 'moderate',
  MODERATOR_ATTENTION = 'moderator-attention',
  MOVE = 'move',
  NORMALIZE = 'normalize',
  REMOVE = 'remove',
  REMOVE_BY_VOTE = 'remove_by_vote',
  RESOTRE = 'restore',
  UNACCEPT = 'unaccept',
  UNLIMITED_TRAFFIC = 'unlimited-traffic',
  VIEW = 'view',
}

export enum Resource {
  ATTRS = 'attrs',
  BRAND = 'brand',
  CAR = 'car',
  COMMENT = 'comment',
  FORUMS = 'forums',
  GLOBAL = 'global',
  HOTLINKS = 'hotlinks',
  PAGES = 'pages',
  PICTURE = 'picture',
  RIGHTS = 'rights',
  SPECIFICATIONS = 'specifications',
  STATUS = 'status',
  USER = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class APIACL {
  private readonly grpc = inject(AutowpClient);
  private readonly platform = inject(PLATFORM_ID);

  public isAllowed$(resource: Resource, privilege: Privilege): Observable<boolean> {
    if (!isPlatformBrowser(this.platform)) {
      return of(false);
    }

    return this.grpc.aclEnforce(new AclEnforceRequest({privilege, resource})).pipe(
      map((response) => response.result),
      catchError(() => {
        return of(false);
      }),
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class ACLService {
  private readonly apiACL = inject(APIACL);
  private readonly auth = inject(AuthService);

  private isAllowedCache = new Map<string, Observable<boolean>>();

  public isAllowed$(resource: Resource, privilege: Privilege): Observable<boolean> {
    const key = resource + '/' + privilege;

    const cached$ = this.isAllowedCache.get(key);
    if (cached$) {
      return cached$;
    }

    const o$ = this.auth.getUser$().pipe(
      switchMap(() => this.apiACL.isAllowed$(resource, privilege)),
      shareReplay({bufferSize: 1, refCount: false}),
    );
    this.isAllowedCache.set(key, o$);
    return o$;
  }
}
