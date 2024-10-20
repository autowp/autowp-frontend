import {inject, Injectable} from '@angular/core';
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
  private readonly grpc = inject(AutowpClient);

  private readonly specs$: Observable<Spec[]> = this.grpc.getSpecs(new Empty()).pipe(
    map((response) => (response.items ? response.items : [])),
    shareReplay(1),
  );

  public getSpecs$(): Observable<Spec[]> {
    return this.specs$;
  }

  public getSpec$(id: number): Observable<null | Spec> {
    return this.getSpecs$().pipe(map((specs) => this.findSpec(specs, id)));
  }

  private findSpec(specs: Spec[], id: number): null | Spec {
    let spec: null | Spec = null;
    for (const s of specs) {
      if (s.id === id) {
        spec = s;
        break;
      }
      spec = this.findSpec(s.childs ? s.childs : [], id);
      if (spec) {
        break;
      }
    }
    return spec;
  }
}
