import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ACLService, Privilege, Resource} from '@services/acl.service';

@Injectable()
export class ModerGuard implements CanActivate {
  constructor(private readonly acl: ACLService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  }
}
