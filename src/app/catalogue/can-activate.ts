import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../services/configuration.service';
import {map} from 'rxjs/operators';

@Injectable()
export class CanActivateCatalogue implements CanActivate {
  constructor(private config: ConfigurationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    const brand = route.paramMap.get('brand');

    if (!brand) {
      return false;
    }

    return this.config.loadConfigurationData().pipe(
      map(config => {
        console.log(config);
        return config.brands.includes(brand);
      })
    );
  }
}
