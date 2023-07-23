import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {UserService} from '@services/user';
import {EMPTY} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-moder-users',
  templateUrl: './users.component.html',
})
export class ModerUsersComponent implements OnInit {
  protected readonly users$ = this.route.queryParamMap.pipe(
    distinctUntilChanged(),
    debounceTime(10),
    switchMap((params) =>
      this.userService.get$({
        fields: 'image,reg_date,last_online,email,login',
        limit: 30,
        page: parseInt(params.get('page'), 10),
      })
    ),
    catchError((error: unknown) => {
      this.toastService.handleError(error);
      return EMPTY;
    })
  );

  constructor(
    private readonly userService: UserService,
    private readonly pageEnv: PageEnvService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 203,
        }),
      0
    );
  }
}
