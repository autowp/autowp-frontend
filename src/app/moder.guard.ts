import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ACLService } from './services/acl.service';

@Injectable()
export class ModerGuard implements CanActivate {
  constructor(private acl: ACLService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.acl.inheritsRole('moder');
  }
}
