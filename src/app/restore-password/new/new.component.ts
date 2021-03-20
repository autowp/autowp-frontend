import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import { distinctUntilChanged, debounceTime, switchMap, catchError, map, tap } from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { AuthService } from '../../services/auth.service';
import { APIService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

interface APIRestorePasswordNewResponse {
  username: string;
}

@Component({
  selector: 'app-restore-password-new',
  templateUrl: './new.component.html'
})
@Injectable()
export class RestorePasswordNewComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public form = {
    code: '',
    password: '',
    password_confirm: ''
  };
  public invalidParams: any;
  public failure = false;

  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: $localize `New password`,
          pageId: 134
        }),
      0
    );
    this.routeSub = this.route.queryParamMap
      .pipe(
        map(params => params.get('code')),
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(code => this.api.request('GET', 'restore-password/new', {params: {code}}).pipe(
          catchError((response: HttpErrorResponse) => {
            if (response.status === 404) {
              this.router.navigate(['/error-404'], {
                skipLocationChange: true
              });
              return EMPTY;
            }

            this.toastService.errorResponse(response);

            return EMPTY;
          }),
          map(response => code)
        )),
        tap(code => {
          this.form.code = code;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public submit() {
    this.api.request<APIRestorePasswordNewResponse>('POST', 'restore-password/new', {body: this.form})
      .pipe(
        catchError((response: HttpErrorResponse) => {
          this.failure = response.status === 404;
          if (response.status === 400) {
            this.invalidParams = response.error.invalid_params;
          } else if (response.status !== 404) {
            this.toastService.errorResponse(response);
          }
          return EMPTY;
        }),
        switchMap(response => {
          return this.auth.login(response.username, this.form.password);
        }),
        catchError(response => {
          this.toastService.errorResponse(response);
          return EMPTY;
        }),
      )
    .subscribe(() => {
      this.router.navigate(['/restore-password/new/ok']);
    });
  }
}
