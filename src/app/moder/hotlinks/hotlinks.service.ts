import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../services/api.service';

export interface APIHotlinksHost {
  host: string;
  count: number;
  whitelisted: boolean;
  blacklisted: boolean;
  links: any[];
}

export interface APIHotlinksHostsGetResponse {
  items: APIHotlinksHost[];
}

@Injectable({
  providedIn: 'root'
})
export class HotlinksService {
  constructor(private api: APIService) {}

  public clearAll(): Observable<Object> {
    return this.api.request('DELETE', 'hotlinks/hosts');
  }

  public clear(host: string): Observable<Object> {
    return this.api.request('DELETE', 'hotlinks/hosts/' + encodeURIComponent(host));
  }

  public addToWhitelist(host: string): Observable<void> {
    return this.api.request<void>('POST', 'hotlinks/whitelist', {body: {
      host: host
    }});
  }

  public addToBlacklist(host: string): Observable<void> {
    return this.api.request<void>('POST', 'hotlinks/blacklist', {body: {
      host: host
    }});
  }

  public getHosts(): Observable<APIHotlinksHostsGetResponse> {
    return this.api.request<APIHotlinksHostsGetResponse>('GET', 'hotlinks/hosts');
  }
}
