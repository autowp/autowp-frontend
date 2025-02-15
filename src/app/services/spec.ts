import {inject, Injectable} from '@angular/core';
import {Spec} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpecService {
  readonly #grpc = inject(AutowpClient);

  public readonly specs$: Observable<Spec[]> = this.#grpc.getSpecs(new Empty()).pipe(
    map((response) => (response.items ? response.items : [])),
    shareReplay({bufferSize: 1, refCount: false}),
  );
}
