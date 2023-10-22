import {Injectable} from '@angular/core';
import {Perspective} from '@grpc/spec.pb';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIPerspectiveService {
  private readonly perspectives$: Observable<Perspective[]> = this.grpc.getPerspectives(new Empty()).pipe(
    map((response) => response.items),
    shareReplay(1),
  );

  constructor(private readonly grpc: AutowpClient) {}

  public getPerspectives$(): Observable<Perspective[]> {
    return this.perspectives$;
  }
}
