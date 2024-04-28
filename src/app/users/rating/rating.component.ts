import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIUsersRatingResponse, UserRatingDetailsRequest} from '@grpc/spec.pb';
import {RatingClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

enum Rating {
  COMMENT_LIKES = 'likes',
  PICTURE_LIKES = 'picture-likes',
  PICTURES = 'pictures',
  SPECS = 'specs',
}

@Component({
  selector: 'app-users-rating',
  templateUrl: './rating.component.html',
})
export class UsersRatingComponent implements OnInit {
  protected readonly rating$: Observable<Rating> = this.route.paramMap.pipe(
    map((params) => params.get('rating')),
    debounceTime(30),
    distinctUntilChanged(),
    map((rating) => {
      switch (rating) {
        case Rating.SPECS:
        case Rating.PICTURES:
        case Rating.COMMENT_LIKES:
        case Rating.PICTURE_LIKES:
          return rating;
        default:
          return Rating.SPECS;
      }
    }),
    shareReplay(1),
  );

  protected readonly valueTitle$: Observable<string> = this.rating$.pipe(
    map((rating) => {
      switch (rating) {
        case Rating.SPECS:
          return $localize`Specs volume`;
        case Rating.PICTURES:
          return $localize`Pictures`;
        case Rating.COMMENT_LIKES:
          return $localize`Likes`;
        case Rating.PICTURE_LIKES:
          return $localize`Picture likes`;
      }
      return rating;
    }),
  );

  private getRatingFans$(rating: Rating, userId: string) {
    if (rating == Rating.PICTURE_LIKES) {
      return this.ratingClient.getUserPictureLikesRatingFans(new UserRatingDetailsRequest({userId})).pipe(
        map((response) =>
          response.fans.map((fan) => ({
            user$: this.userService.getUser2$(userId),
            volume: fan.volume,
          })),
        ),
      );
    }
    if (rating == Rating.COMMENT_LIKES) {
      return this.ratingClient.getUserCommentsRatingFans(new UserRatingDetailsRequest({userId})).pipe(
        map((response) =>
          response.fans.map((fan) => ({
            user$: this.userService.getUser2$(userId),
            volume: fan.volume,
          })),
        ),
      );
    }
    return null;
  }

  private getRatingBrands$(rating: Rating, userId: string) {
    if (rating == Rating.PICTURES) {
      return this.ratingClient.getUserPicturesRatingBrands(new UserRatingDetailsRequest({userId}));
    }
    if (rating == Rating.SPECS) {
      return this.ratingClient.getUserSpecsRatingBrands(new UserRatingDetailsRequest({userId}));
    }
    return null;
  }

  protected readonly users$ = this.rating$.pipe(
    switchMap((rating) => {
      let o$: Observable<APIUsersRatingResponse> = EMPTY;
      switch (rating) {
        case Rating.SPECS:
          o$ = this.ratingClient.getUserSpecsRating(new Empty());
          break;
        case Rating.PICTURES:
          o$ = this.ratingClient.getUserPicturesRating(new Empty());
          break;
        case Rating.COMMENT_LIKES:
          o$ = this.ratingClient.getUserCommentsRating(new Empty());
          break;
        case Rating.PICTURE_LIKES:
          o$ = this.ratingClient.getUserPictureLikesRating(new Empty());
          break;
        default:
          return EMPTY;
      }
      return o$.pipe(
        catchError((err: unknown) => {
          this.toastService.handleError(err);
          return EMPTY;
        }),
        map((response) =>
          response.users.map((user) => ({
            brands$: this.getRatingBrands$(rating, user.userId),
            fans$: this.getRatingFans$(rating, user.userId),
            user$: this.userService.getUser2$(user.userId),
            volume: user.volume,
            weight: user.weight,
          })),
        ),
      );
    }),
  );

  protected readonly Rating = Rating;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly ratingClient: RatingClient,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 173}), 0);
  }
}
