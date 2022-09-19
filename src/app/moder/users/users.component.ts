import { Component} from '@angular/core';
import { UserService, APIUser } from '../../services/user';
import { APIPaginator } from '../../services/api.service';
import { PageEnvService } from '../../services/page-env.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-moder-users',
  templateUrl: './users.component.html'
})
export class ModerUsersComponent {
  public paginator: APIPaginator;
  public loading = 0;
  public users: APIUser[] = [];

  constructor(
    private userService: UserService,
    private pageEnv: PageEnvService,
    private route: ActivatedRoute
  ) {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 203
        }),
      0
    );

    this.load();
  }

  private load() {
    this.loading++;
    this.users = [];

    this.route.queryParamMap
      .pipe(
        distinctUntilChanged(),
        debounceTime(10),
        switchMap(params => this.userService.get({
          page: parseInt(params.get('page'), 10),
          limit: 30,
          fields: 'image,reg_date,last_online,email,login'
        }))
      )
      .subscribe(
        (response) => {
          this.users = response.items;
          this.paginator = response.paginator;
          this.loading--;
        },
        (response) => {
          console.log(response);
          this.loading--;
        }
      );
  }
}
