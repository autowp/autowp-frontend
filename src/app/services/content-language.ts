import {Injectable} from '@angular/core';
import {ItemsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable()
export class ContentLanguageService {
  public readonly languages$: Observable<string[]> = this.itemClient.getContentLanguages(new Empty()).pipe(
    map((response) => response.languages),
    shareReplay(1),
  );

  constructor(private readonly itemClient: ItemsClient) {}
}
