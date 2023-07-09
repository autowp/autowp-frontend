import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {ACLService, Privilege, Resource} from '@services/acl.service';

export const moderGuard: CanActivateFn = () => {
  const acl = inject(ACLService);
  return acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
};
