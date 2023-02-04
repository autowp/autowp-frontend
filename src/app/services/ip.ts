import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AutowpClient} from '@grpc/spec.pbsc';
import {APIGetIPRequest, APIIP} from '@grpc/spec.pb';

@Injectable()
export class IpService {
  private hostnames = new Map<string, Observable<string>>();

  constructor(private grpc: AutowpClient) {}

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
    return this.grpc.getIP(new APIGetIPRequest({ip, fields}));
  }
}
