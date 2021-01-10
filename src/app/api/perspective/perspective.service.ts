import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';

export interface APIPerspective {
  id: number;
  name: string;
}

export interface APIPerspectiveGetResponse {
  items: APIPerspective[];
}

@Injectable({
  providedIn: 'root'
})
export class APIPerspectiveService {
  private readonly perspectives$: Observable<APIPerspective[]>;

  constructor(private http: HttpClient) {
    this.perspectives$ = this.http
      .get<APIPerspectiveGetResponse>('/api/perspective')
      .pipe(
        map(response => response.items),
        shareReplay(1)
      );
  }

  public getPerspectives(): Observable<APIPerspective[]> {
    return this.perspectives$;
  }
}
