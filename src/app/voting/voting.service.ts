import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APIUser} from '../services/user';
import {APIService} from '../services/api.service';

export interface APIVotingVariant {
  id: number;
  votes: number;
  name: string;
  text: string;
  is_max: boolean;
  is_min: boolean;
  percent: number;
}

export interface APIVoting {
  id: number;
  name: string;
  multivariant: boolean;
  variants: APIVotingVariant[];
  can_vote: boolean;
  text: string;
  begin_date: string;
  end_date: string;
}

export interface APIVotingVariantVotesGetOptions {
  fields: string;
}

export interface APIVotingVariantVote {
  id: number;
  user: APIUser;
}

export interface APIVotingVariantVotesGetResponse {
  items: APIVotingVariantVote[];
}

@Injectable()
export class VotingService {
  constructor(private api: APIService) {}

  public getVoting(id: number): Observable<APIVoting> {
    return this.api.request<APIVoting>('GET', 'voting/' + id);
  }

  public getVariantVotes(
    votingId: number,
    variantId: number,
    options: APIVotingVariantVotesGetOptions
  ): Observable<APIVotingVariantVotesGetResponse> {
    const params: {[param: string]: string} = {};

    if (options.fields) {
      params.fields = options.fields;
    }

    return this.api.request<APIVotingVariantVotesGetResponse>(
      'GET',
      'voting/' + votingId + '/variant/' + variantId + '/vote',
      {
        params,
      }
    );
  }
}
