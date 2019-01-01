import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  public clearAll(): Observable<Object> {
    return this.http.delete('/api/hotlinks/hosts');
  }

  public clear(host: string): Observable<Object> {
    return this.http.delete('/api/hotlinks/hosts/' + encodeURIComponent(host));
  }

  public addToWhitelist(host: string): Observable<void> {
    return this.http.post<void>('/api/hotlinks/whitelist', {
      host: host
    });
  }

  public addToBlacklist(host: string): Observable<void> {
    return this.http.post<void>('/api/hotlinks/blacklist', {
      host: host
    });
  }

  public getHosts(): Observable<APIHotlinksHostsGetResponse> {
    return this.http.get<APIHotlinksHostsGetResponse>('/api/hotlinks/hosts');
  }
}
