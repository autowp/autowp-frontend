import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ItemsClient} from '../../../generated/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';

@Injectable()
export class ContentLanguageService {
  public readonly languages$: Observable<string[]> = this.itemClient.getContentLanguages(new Empty()).pipe(
    map((response) => response.languages),
    shareReplay(1)
  );

  constructor(private itemClient: ItemsClient) {}
}
