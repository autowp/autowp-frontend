import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {InfoSpecRowComponent} from './row/row.component';

@Component({
  imports: [RouterLink, InfoSpecRowComponent, AsyncPipe],
  selector: 'app-info-spec',
  templateUrl: './spec.component.html',
})
export class InfoSpecComponent implements OnInit {
  readonly #pageEnv = inject(PageEnvService);
  readonly #toastService = inject(ToastsService);
  readonly #grpc = inject(AutowpClient);

  protected readonly specs$ = this.#grpc.getSpecs(new Empty()).pipe(
    catchError((response: unknown) => {
      this.#toastService.handleError(response);
      return EMPTY;
    }),
    map((specs) => specs.items),
  );

  ngOnInit(): void {
    setTimeout(() => this.#pageEnv.set({pageId: 174}), 0);
  }
}
