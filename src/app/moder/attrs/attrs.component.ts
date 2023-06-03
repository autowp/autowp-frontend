import {Component, OnInit} from '@angular/core';
import {PageEnvService} from '@services/page-env.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {APIAttrsService} from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-moder-attrs',
  templateUrl: './attrs.component.html',
})
export class ModerAttrsComponent implements OnInit {
  private readonly attributesChange$ = new BehaviorSubject<null>(null);

  protected readonly attributes$ = this.attributesChange$.pipe(
    switchMap(() => this.attrsService.getAttributes$({recursive: true})),
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  protected readonly zones$ = this.attrsService.getZones$().pipe(
    catchError((response: unknown) => {
      this.toastService.handleError(response);
      return EMPTY;
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly attrsService: APIAttrsService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {isAdminPage: true},
          pageId: 100,
        }),
      0
    );
  }

  private move(id: number, dir: string) {
    this.api
      .request<void>('PATCH', 'attr/attribute/' + id, {
        body: {
          move: dir,
        },
      })
      .subscribe({
        next: () => this.attributesChange$.next(null),
        error: (response: unknown) => this.toastService.handleError(response),
      });
  }

  protected moveUp(id: number) {
    this.move(id, 'up');
  }

  protected moveDown(id: number) {
    this.move(id, 'down');
  }
}
