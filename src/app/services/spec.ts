import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APIService } from './api.service';

export interface APISpecGetResponse {
  items: APISpec[];
}

export interface APISpec {
  id: number;
  name: string;
  short_name: string;
  childs: APISpec[];
}

@Injectable()
export class SpecService {
  private readonly specs$: Observable<APISpec[]>;

  constructor(private api: APIService) {
    this.specs$ = this.api.request<APISpecGetResponse>('GET', 'spec').pipe(
      map(response => response.items),
      shareReplay(1)
    );
  }

  public getSpecs(): Observable<APISpec[]> {
    return this.specs$;
  }

  public getSpec(id: number): Observable<APISpec> {
    return this.getSpecs().pipe(map(specs => this.findSpec(specs, id)));
  }

  private findSpec(specs: APISpec[], id: number): APISpec | null {
    let spec = null;
    for (const s of specs) {
      if (s.id === id) {
        spec = s;
        break;
      }
      spec = this.findSpec(s.childs, id);
      if (spec) {
        break;
      }
    }
    return spec;
  }
}
