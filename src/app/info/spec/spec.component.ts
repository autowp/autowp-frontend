import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '../../services/page-env.service';
import {EMPTY} from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';
import {AutowpClient} from '@grpc/spec.pbsc';
import {Empty} from '@ngx-grpc/well-known-types';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-info-spec',
  templateUrl: './spec.component.html',
})
export class InfoSpecComponent implements OnInit {
  public specs$ = this.grpc.getSpecs(new Empty()).pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    }),
    map((specs) => specs.items)
  );

  constructor(private pageEnv: PageEnvService, private toastService: ToastsService, private grpc: AutowpClient) {}

  ngOnInit(): void {
    setTimeout(() => this.pageEnv.set({pageId: 174}), 0);
  }
}
