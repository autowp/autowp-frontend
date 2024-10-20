import {inject, Injectable} from '@angular/core';
import {APIGetIPRequest, APIIP} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private readonly grpc = inject(AutowpClient);

  private hostnames = new Map<string, Observable<string>>();

  public getHostByAddr$(ip: string): Observable<string> {
    const hostname$ = this.hostnames.get(ip);
    if (hostname$ !== undefined) {
      return hostname$;
    }

    const o$ = this.getIp$(ip, ['hostname']).pipe(map((response) => response.hostname));

    this.hostnames.set(ip, o$);

    return o$;
  }

  public getIp$(ip: string, fields: string[]): Observable<APIIP> {
    return this.grpc.getIP(new APIGetIPRequest({fields, ip}));
  }
}
