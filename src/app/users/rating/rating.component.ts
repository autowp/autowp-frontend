import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {APIUser} from '@services/user';
import {PageEnvService} from '@services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  finalize,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';

export interface APIRatingUser {
  user: APIUser;
  brands: {
    route: string[];
    name: string;
  }[];
  fans: {
    volume: number;
    user: APIUser;
  }[];
  volume: number;
  weight: number;
}

export interface APIUsersRatingGetResponse {
  users: APIRatingUser[];
}

@Component({
  selector: 'app-users-rating',
  templateUrl: './rating.component.html',
})
export class UsersRatingComponent implements OnInit {
  protected readonly rating$ = this.route.paramMap.pipe(
    map((params) => params.get('rating')),
    debounceTime(30),
    distinctUntilChanged(),
    map((rating) => rating || 'specs'),
    shareReplay(1)
  );

  protected loading = 0;
  protected readonly valueTitle$: Observable<string> = this.rating$.pipe(
    map((rating) => {
      switch (rating) {
        case 'specs':
          return $localize`Specs volume`;
        case 'pictures':
          return $localize`Pictures`;
        case 'likes':
          return $localize`Likes`;
        case 'picture-likes':
          return $localize`Picture likes`;
      }
      return rating;
    })
  );

  protected readonly users$: Observable<APIRatingUser[]> = this.rating$.pipe(
    tap(() => this.loading++),
    switchMap((rating) => this.api.request<APIUsersRatingGetResponse>('GET', 'rating/' + rating)),
    finalize(() => {
      this.loading--;
    }),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      return EMPTY;
    }),
    map((response) => response.users)
  );

  constructor(
    private readonly api: APIService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 173}), 0);
  }
}
