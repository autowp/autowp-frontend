import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import {Subscription, EMPTY} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { APIUser } from '../../services/user';
import { PageEnvService } from '../../services/page-env.service';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
  finalize, map
} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

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
  templateUrl: './rating.component.html'
})
@Injectable()
export class UsersRatingComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public rating: string;
  public loading = 0;
  public valueTitle: string;
  public users: APIRatingUser[];

  constructor(
    private api: APIService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          name: 'page/173/name',
          pageId: 173
        }),
      0
    );

    this.routeSub = this.route.paramMap
      .pipe(
        map(params => params.get('rating')),
        debounceTime(30),
        distinctUntilChanged(),
        switchMap(rating => {
          this.rating = rating || 'specs';

          switch (this.rating) {
            case 'specs':
              this.valueTitle = 'users/rating/specs-volume';
              break;
            case 'pictures':
              this.valueTitle = 'users/rating/pictures';
              break;
            case 'likes':
              this.valueTitle = 'users/rating/likes';
              break;
            case 'picture-likes':
              this.valueTitle = 'users/rating/picture-likes';
              break;
          }

          this.loading++;
          return this.api
            .request<APIUsersRatingGetResponse>('GET', 'rating/' + this.rating)
            .pipe(
              finalize(() => {
                this.loading--;
              }),
              catchError(err => {
                this.toastService.response(err);
                return EMPTY;
              })
            );
        })
      )
      .subscribe(response => {
        this.users = response.users;
      });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
