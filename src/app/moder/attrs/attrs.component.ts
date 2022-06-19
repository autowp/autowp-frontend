import { Component, OnInit} from '@angular/core';
import { PageEnvService } from '../../services/page-env.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import { APIAttrsService } from '../../api/attrs/attrs.service';
import {ToastsService} from '../../toasts/toasts.service';
import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-moder-attrs',
  templateUrl: './attrs.component.html'
})
export class ModerAttrsComponent implements OnInit {
  private attributesChange$ = new BehaviorSubject<null>(null);

  public attributes$ = this.attributesChange$.pipe(
    switchMap(() => this.attrsService.getAttributes({ recursive: true })),
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

  public zones$ = this.attrsService.getZones().pipe(
    catchError(response => {
      this.toastService.response(response);
      return EMPTY;
    })
  );

  constructor(
    private api: APIService,
    private attrsService: APIAttrsService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}

  ngOnInit(): void {
    setTimeout(
      () =>
        this.pageEnv.set({
          layout: {
            isAdminPage: true,
            needRight: false
          },
          nameTranslated: $localize `Attributes`,
          pageId: 100
        }),
      0
    );
  }

  private move(id: number, dir: string) {
    this.api
      .request<void>('PATCH', 'attr/attribute/' + id, {body: {
        move: dir
      }})
      .subscribe({
        next: () => this.attributesChange$.next(null),
        error: response => this.toastService.response(response)
      });
  }

  public moveUp(id: number) {
    this.move(id, 'up');
  }

  public moveDown(id: number) {
    this.move(id, 'down');
  }
}
