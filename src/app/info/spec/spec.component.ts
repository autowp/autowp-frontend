import {Component, OnInit} from '@angular/core';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-info-spec',
  templateUrl: './spec.component.html',
})
export class InfoSpecComponent implements OnInit {
  protected readonly specs$ = this.grpc.getSpecs(new Empty()).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((specs) => specs.items),
  );

  constructor(
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly grpc: AutowpClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 174}), 0);
  }
}
