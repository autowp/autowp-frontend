import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface APIPerspective {
  id: number;
  name: string;
}

export interface APIPerspectiveGetResponse {
  items: APIPerspective[];
}

@Injectable()
export class PerspectiveService {
  perspectives$: Observable<APIPerspective[]>;

  constructor(private http: HttpClient) {
    this.perspectives$ = this.http
      .get<APIPerspectiveGetResponse>('/go-api/perspective')
      .pipe(
        map(response => response.items),
        shareReplay(1)
      );
  }

  public getPerspectives(): Observable<APIPerspective[]> {
    return this.perspectives$;
  }
}
