import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {CommentsClient} from '@grpc/spec.pbsc';
import {GetMessagesRequest, ModeratorAttention} from '@grpc/spec.pb';

@Injectable({
  providedIn: 'root',
})
export class APICommentsService {
  public readonly attentionCommentsCount$: Observable<number> = this.acl
    .isAllowed$(Resource.GLOBAL, Privilege.MODERATE)
    .pipe(
      switchMap((isModer) => {
        if (!isModer) {
          return of(null as number);
        }

        return this.commentsClient
          .getMessages(
            new GetMessagesRequest({
              moderatorAttention: ModeratorAttention.REQUIRED,
              limit: 0,
            })
          )
          .pipe(map((response) => response.paginator.totalItemCount));
      }),
      shareReplay(1)
    );

  constructor(private readonly acl: ACLService, private readonly commentsClient: CommentsClient) {}
}
