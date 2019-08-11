import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEnvService } from '../../services/page-env.service';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';

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
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: false
          },
          name: 'page/134/name',
          pageId: 134
        }),
      0
    );
    this.routeSub = this.route.queryParams
      .pipe(
        distinctUntilChanged(),
        debounceTime(30),
        switchMap(params => {
          this.form.code = params.code;

          return this.http.get('/api/restore-password/new', {
            params: {
              code: params.code
            }
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  public submit() {
    this.http.post('/api/restore-password/new', this.form).subscribe(
      () => {
        this.router.navigate(['/restore-password/new/ok']);
      },
      response => {
        this.failure = response.status === 404;
        if (response.status === 400) {
          this.invalidParams = response.error.invalid_params;
        } else if (response.status !== 404) {
          this.toastService.response(response);
        }
      }
    );
  }
}
