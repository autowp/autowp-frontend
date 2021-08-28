import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import { distinctUntilChanged, debounceTime, switchMap, catchError, map, tap } from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import { AuthService } from '../../services/auth.service';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import {APIPasswordRecoveryCheckCodeRequest, APIPasswordRecoveryConfirmRequest} from '../../../../generated/spec.pb';
import {extractFieldViolations, fieldVolations2InvalidParams} from '../../grpc';
import {GrpcStatusEvent} from '@ngx-grpc/common';
import {InvalidParams} from '../../utils/invalid-params.pipe';

@Component({
  selector: 'app-restore-password-new',
  templateUrl: './new.component.html'
})
export class RestorePasswordNewComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public form = {
    code: '',
    password: '',
    passwordConfirm: ''
  };
  public invalidParams: InvalidParams;
  public failure = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private auth: AuthService,
    private grpc: AutowpClient
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
        switchMap(code => this.grpc.passwordRecoveryCheckCode(new APIPasswordRecoveryCheckCodeRequest({code})).pipe(
          catchError(() => {
            this.router.navigate(['/error-404'], {
              skipLocationChange: true
            });
            return EMPTY;
          }),
          map(() => code)
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
    this.grpc.passwordRecoveryConfirm(new APIPasswordRecoveryConfirmRequest(this.form))
      .pipe(
        catchError((response: GrpcStatusEvent) => {
          this.toastService.grpcErrorResponse(response);
          if (response.statusCode === 3) {
            const fieldViolations = extractFieldViolations(response);
            this.invalidParams = fieldVolations2InvalidParams(fieldViolations);
          }
          return EMPTY;
        }),
        switchMap(response => this.auth.login(response.login, this.form.password)),
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
