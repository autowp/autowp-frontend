import {Injectable} from '@angular/core';
import {DeleteModerVoteTemplateRequest, ModerVoteTemplate} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {AuthService} from '@services/auth.service';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';

export interface APIPictureModerVoteTemplatePostData {
  name: string;
  vote: number;
}

@Injectable({
  providedIn: 'root',
})
export class APIPictureModerVoteTemplateService {
  private readonly change$ = new BehaviorSubject<null>(null);

  constructor(
    private readonly auth: AuthService,
    private readonly pictures: PicturesClient,
  ) {}

  public getTemplates$(): Observable<ModerVoteTemplate[]> {
    return combineLatest([this.change$, this.auth.getUser$()]).pipe(
      switchMap(() => this.pictures.getModerVoteTemplates(new Empty({}))),
      map((response) => (response.items ? response.items : [])),
      shareReplay(1),
    );
  }

  public deleteTemplate$(id: string): Observable<Empty | void> {
    return this.pictures
      .deleteModerVoteTemplate(new DeleteModerVoteTemplateRequest({id}))
      .pipe(tap(() => this.change$.next(null)));
  }

  public createTemplate$(template: APIPictureModerVoteTemplatePostData): Observable<ModerVoteTemplate> {
    return this.pictures
      .createModerVoteTemplate(
        new ModerVoteTemplate({
          message: template.name,
          vote: template.vote,
        }),
      )
      .pipe(tap(() => this.change$.next(null)));
  }
}
