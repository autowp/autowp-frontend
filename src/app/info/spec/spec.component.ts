import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { SpecService, APISpec } from '../../services/spec';
import { PageEnvService } from '../../services/page-env.service';
import { Subscription } from 'rxjs';
import {ToastsService} from '../../toasts/toasts.service';

@Component({
  selector: 'app-info-spec',
  templateUrl: './spec.component.html'
})
@Injectable()
export class InfoSpecComponent implements OnInit, OnDestroy {
  public specs: APISpec[];
  private sub: Subscription;

  constructor(
    private specService: SpecService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
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

    this.sub = this.specService.getSpecs().subscribe(
      specs => (this.specs = specs),
      response => this.toastService.response(response)
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
