import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from './api.service';

@Injectable()
export class PictureModerVoteService {
  constructor(private api: APIService) {}

  public vote(
    pictureId: number,
    vote: number,
    reason: string
  ): Observable<void> {
    return this.api.request<void>('PUT', 'picture-moder-vote/' + pictureId, {body: {
      vote: vote,
      reason: reason
    }});
  }

  public cancel(pictureId: number): Observable<void> {
    return this.api.request<void>('DELETE', 'picture-moder-vote/' + pictureId);
  }
}
