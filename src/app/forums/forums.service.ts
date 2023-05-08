import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {shareReplay, switchMap, map} from 'rxjs/operators';
import {AuthService} from '@services/auth.service';
import {APIService} from '@services/api.service';
import {APIComment} from '../api/comments/comments.service';
import {ForumsClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {APIForumsUserSummary} from '@grpc/spec.pb';

export interface MessageStateParams {
  topic_id: number;
  page: number;
}

const LIMIT = 20;

@Injectable({
  providedIn: 'root',
})
export class ForumsService {
  private readonly summary$: Observable<APIForumsUserSummary> = this.auth.getUser$().pipe(
    switchMap((user) => {
      if (!user) {
        return of(null);
      }
      return this.grpc.getUserSummary(new Empty());
    }),
    shareReplay(1)
  );

  constructor(private api: APIService, private auth: AuthService, private grpc: ForumsClient) {}

  public getUserSummary$(): Observable<APIForumsUserSummary> {
    return this.summary$;
  }

  public getLimit(): number {
    return LIMIT;
  }

  public getMessageStateParams$(messageID: number): Observable<MessageStateParams> {
    return this.api
      .request<APIComment>('GET', 'comment/' + messageID, {
        params: {
          fields: 'page',
          limit: LIMIT.toString(),
        },
      })
      .pipe(
        map((response) => ({
          topic_id: response.item_id,
          page: response.page,
        }))
      );
  }
}
