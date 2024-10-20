import {inject, Injectable} from '@angular/core';
import {APIService} from '@services/api.service';
import {Observable} from 'rxjs';

export interface APIVotingVariant {
  id: number;
  is_max: boolean;
  is_min: boolean;
  name: string;
  percent: number;
  text: string;
  votes: number;
}

export interface APIVoting {
  begin_date: string;
  can_vote: boolean;
  end_date: string;
  id: number;
  multivariant: boolean;
  name: string;
  text: string;
  variants: APIVotingVariant[];
}

export interface APIVotingVariantVote {
  id: number;
  user_id: string;
}

export interface APIVotingVariantVotesGetResponse {
  items: APIVotingVariantVote[];
}

@Injectable()
export class VotingService {
  private readonly api = inject(APIService);

  public getVoting$(id: number): Observable<APIVoting> {
    return this.api.request<APIVoting>('GET', 'voting/' + id);
  }

  public getVariantVotes$(votingId: number, variantId: number): Observable<APIVotingVariantVotesGetResponse> {
    return this.api.request<APIVotingVariantVotesGetResponse>(
      'GET',
      'voting/' + votingId + '/variant/' + variantId + '/vote',
    );
  }
}
