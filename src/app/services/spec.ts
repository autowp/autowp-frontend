import {Injectable} from '@angular/core';
import {Spec} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

export interface APISpecGetResponse {
  items: Spec[];
}

@Injectable()
export class SpecService {
  private readonly specs$: Observable<Spec[]>;

  constructor(private readonly grpc: AutowpClient) {
    this.specs$ = this.grpc.getSpecs(new Empty()).pipe(
      map((response) => response.items),
      shareReplay(1),
    );
  }

  public getSpecs$(): Observable<Spec[]> {
    return this.specs$;
  }

  public getSpec$(id: number): Observable<Spec> {
    return this.getSpecs$().pipe(map((specs) => this.findSpec(specs, id)));
  }

  private findSpec(specs: Spec[], id: number): Spec | null {
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
