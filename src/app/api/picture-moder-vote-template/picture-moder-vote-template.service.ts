import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {AuthService} from '@services/auth.service';
import {map, shareReplay, tap, switchMap} from 'rxjs/operators';
import {PicturesClient} from '@grpc/spec.pbsc';
import {DeleteModerVoteTemplateRequest, ModerVoteTemplate} from '@grpc/spec.pb';
import {Empty} from '@ngx-grpc/well-known-types';

export interface APIPictureModerVoteTemplatePostData {
  vote: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class APIPictureModerVoteTemplateService {
  private readonly change$ = new BehaviorSubject<null>(null);

  constructor(private readonly auth: AuthService, private readonly pictures: PicturesClient) {}

  public getTemplates$(): Observable<ModerVoteTemplate[]> {
    return combineLatest([this.change$, this.auth.getUser$()]).pipe(
      switchMap(() => this.pictures.getModerVoteTemplates(new Empty({}))),
      map((response) => response.items),
      shareReplay(1)
    );
  }

  public deleteTemplate$(id: string): Observable<void | Empty> {
    return this.pictures
      .deleteModerVoteTemplate(new DeleteModerVoteTemplateRequest({id}))
      .pipe(tap(() => this.change$.next(null)));
  }

  public createTemplate$(template: APIPictureModerVoteTemplatePostData): Observable<ModerVoteTemplate> {
    return this.pictures
      .createModerVoteTemplate(
        new ModerVoteTemplate({
          vote: template.vote,
          message: template.name,
        })
      )
      .pipe(tap(() => this.change$.next(null)));
  }
}
