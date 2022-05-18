import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { switchMapTo, map, shareReplay, tap } from 'rxjs/operators';
import {PicturesClient} from '../../../../generated/spec.pbsc';
import {DeleteModerVoteTemplateRequest, ModerVoteTemplate} from '../../../../generated/spec.pb';
import {Empty} from '@ngx-grpc/well-known-types';

export interface APIPictureModerVoteTemplatePostData {
  vote: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class APIPictureModerVoteTemplateService {

  private change$ = new BehaviorSubject<null>(null);

  constructor(private auth: AuthService, private pictures: PicturesClient) {}

  public getTemplates(): Observable<ModerVoteTemplate[]> {
    return combineLatest([this.change$, this.auth.getUser()]).pipe(
      switchMapTo(
        this.pictures.getModerVoteTemplates(new Empty({}))
      ),
      map(response => response.items),
      shareReplay(1)
    );
  }

  public deleteTemplate(id: string): Observable<void | Empty> {
    return this.pictures.deleteModerVoteTemplate(new DeleteModerVoteTemplateRequest({id}))
      .pipe(tap(() => this.change$.next(null)));
  }

  public createTemplate(
    template: APIPictureModerVoteTemplatePostData
  ): Observable<ModerVoteTemplate> {
    return this.pictures.createModerVoteTemplate(new ModerVoteTemplate({
      vote: template.vote,
      message: template.name
    })).pipe(tap(() => this.change$.next(null)));
  }
}
