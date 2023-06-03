import {Component, OnInit} from '@angular/core';
import {UserService} from '@services/user';
import {PageEnvService} from '@services/page-env.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, distinctUntilChanged, debounceTime, catchError} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {EMPTY} from 'rxjs';

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
        page: parseInt(params.get('page'), 10),
        limit: 30,
        fields: 'image,reg_date,last_online,email,login',
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
