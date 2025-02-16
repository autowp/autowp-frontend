import {inject, Injectable} from '@angular/core';
import {Perspective} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIPerspectiveService {
  readonly #grpc = inject(AutowpClient);

  readonly #perspectives$: Observable<Perspective[]> = this.#grpc.getPerspectives(new Empty()).pipe(
    map((response) => (response.items ? response.items : [])),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  public getPerspectives$(): Observable<Perspective[]> {
    return this.#perspectives$;
  }
}
