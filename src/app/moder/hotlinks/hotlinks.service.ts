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

  public clearAll(): Observable<void> {
    return this.api.request<void>('DELETE', 'hotlinks/hosts');
  }

  public clear(host: string): Observable<void> {
    return this.api.request<void>('DELETE', 'hotlinks/hosts/' + encodeURIComponent(host));
  }

  public addToWhitelist(host: string): Observable<void> {
    return this.api.request<void>('POST', 'hotlinks/whitelist', {body: {
      host
    }});
  }

  public addToBlacklist(host: string): Observable<void> {
    return this.api.request<void>('POST', 'hotlinks/blacklist', {body: {
      host
    }});
  }

  public getHosts(): Observable<APIHotlinksHostsGetResponse> {
    return this.api.request<APIHotlinksHostsGetResponse>('GET', 'hotlinks/hosts');
  }
}
