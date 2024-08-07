import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIUsersRequest, APIUsersResponse, UserFields} from '@grpc/spec.pb';
import {UsersClient} from '@grpc/spec.pbsc';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-users',
  templateUrl: './users.component.html',
})
export class ModerUsersComponent implements OnInit {
  protected readonly users$: Observable<APIUsersResponse> = this.route.queryParamMap.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((params) =>
      this.usersClient.getUsers(
        new APIUsersRequest({
          fields: new UserFields({
            email: true,
            lastOnline: true,
            login: true,
            photo: true,
            regDate: true,
          }),
          limit: '30',
          page: params.get('page') || undefined,
        }),
      ),
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    }),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService,
    private readonly usersClient: UsersClient,
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 203,
        }),
      0,
    );
  }
}
