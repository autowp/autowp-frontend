import { Injectable } from '@angular/core';
import { APIUser } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIService } from './api.service';

export interface APIIP {
  address: string;
  hostname: string;
  blacklist: {
    reason: string;
    up_to: string;
    user: APIUser;
  };
  whitelist: {
    reason: string;
  };
  rights: {
    add_to_blacklist: boolean;
    remove_from_blacklist: boolean;
  };
}

@Injectable()
export class IpService {
  private hostnames = new Map<string, Observable<string>>();

  constructor(private api: APIService) {}

  public getHostByAddr(ip: string): Observable<string> {
    const hostname = this.hostnames.get(ip);
    if (hostname !== undefined) {
      return hostname;
    }

    const o = this.api
      .request<APIIP>('GET', 'ip/' + ip, {
        params: {
          fields: 'hostname'
        }
      })
      .pipe(map(response => response.hostname));

    this.hostnames.set(ip, o);

    return o;
  }
}
