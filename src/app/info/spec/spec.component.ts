import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import { Subscription } from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';
import {AutowpClient} from '../../../../generated/spec.pbsc';
import {Spec} from '../../../../generated/spec.pb';
import {Empty} from '@ngx-grpc/well-known-types';

@Component({
  selector: 'app-info-spec',
  templateUrl: './spec.component.html'
})
export class InfoSpecComponent implements OnInit, OnDestroy {
  public specs: Spec[];
  private sub: Subscription;

  constructor(
    private pageEnv: PageEnvService,
    private toastService: ToastsService,
    private grpc: AutowpClient
  ) {

  }

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            needRight: true
          },
          nameTranslated: $localize `Specs`,
          pageId: 174
        }),
      0
    );

    this.sub = this.grpc.getSpecs(new Empty()).subscribe(
      specs => (this.specs = specs.items),
      response => this.toastService.response(response)
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
