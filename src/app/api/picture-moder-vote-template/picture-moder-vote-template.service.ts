import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { switchMapTo, map, shareReplay, tap } from 'rxjs/operators';
import { APIService } from '../../services/api.service';

export interface APIPictureModerVoteTemplatePostData {
  vote: number;
  name: string;
}

export class APIPictureModerVoteTemplate {
  id: number;
  name: string;
  vote: number;
}

export class APIPictureModerVoteTemplateGetResponse {
  items: APIPictureModerVoteTemplate[];
}

@Injectable({
  providedIn: 'root'
})
export class APIPictureModerVoteTemplateService {

  private change$ = new BehaviorSubject<null>(null);
  constructor(private api: APIService, private auth: AuthService) {}

  public getTemplates(): Observable<APIPictureModerVoteTemplate[]> {
    return combineLatest([this.change$, this.auth.getUser()]).pipe(
      switchMapTo(
        this.api.request<APIPictureModerVoteTemplateGetResponse>('GET', 'picture-moder-vote-template')
      ),
      map(response => response.items),
      shareReplay(1)
    );
  }

  public deleteTemplate(id: number): Observable<void> {
    return this.api
      .request<void>('DELETE', 'picture-moder-vote-template/' + id)
      .pipe(tap(() => this.change$.next(null)));
  }

  public createTemplate(
    template: APIPictureModerVoteTemplatePostData
  ): Observable<void> {
    return this.api
      .request<void>('POST', 'picture-moder-vote-template', {body: template})
      .pipe(tap(() => this.change$.next(null)));
  }
}
