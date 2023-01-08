import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Empty} from '@ngx-grpc/well-known-types';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Perspective} from '@grpc/spec.pb';

@Injectable({
  providedIn: 'root',
})
export class APIPerspectiveService {
  private readonly perspectives$: Observable<Perspective[]>;

  constructor(private grpc: AutowpClient) {
    this.perspectives$ = this.grpc.getPerspectives(new Empty()).pipe(
      map((response) => response.items),
      shareReplay(1)
    );
  }

  public getPerspectives(): Observable<Perspective[]> {
    return this.perspectives$;
  }
}
