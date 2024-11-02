import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ItemType} from '@grpc/spec.pb';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

import {ToastsService} from '../../toasts/toasts.service';
import {CarsSpecificationsEditorEngineComponent} from './engine/engine.component';
import {CarsSpecificationsEditorResultComponent} from './result/result.component';
import {CarsSpecificationsEditorSpecComponent} from './spec/spec.component';

@Component({
  imports: [
    RouterLink,
    MarkdownComponent,
    CarsSpecificationsEditorEngineComponent,
    CarsSpecificationsEditorSpecComponent,
    CarsSpecificationsEditorResultComponent,
    AsyncPipe,
  ],
  selector: 'app-cars-specifications-editor',
  standalone: true,
  templateUrl: './specifications-editor.component.html',
})
export class CarsSpecificationsEditorComponent {
  private readonly api = inject(APIService);
  private readonly itemService = inject(ItemService);
  private readonly acl = inject(ACLService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly toastService = inject(ToastsService);
  private readonly auth = inject(AuthService);

  private readonly change$ = new BehaviorSubject<void>(void 0);
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly isSpecsAdmin$ = this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.ADMIN);
  protected readonly tab$ = this.route.queryParamMap.pipe(map((params) => params.get('tab') ?? 'info'));
  protected readonly user$ = this.auth.getUser$();

  protected readonly data$: Observable<APIItem> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((itemID) =>
      this.change$.pipe(
        switchMap(() =>
          this.itemService.getItem$(itemID, {
            fields: 'name_html,name_text,engine_id,attr_zone_id',
          }),
        ),
      ),
    ),
    switchMap((item) => {
      if (!item) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      this.pageEnv.set({
        pageId: 102,
        title: $localize`Specs editor of ${item.name_text}`,
      });
      return of(item);
    }),
  );

  protected onEngineChanged() {
    this.change$.next();
  }

  protected refreshInheritance(item: APIItem) {
    this.api.request$<void>('POST', 'item/' + item.id + '/refresh-inheritance', {body: {}}).subscribe({
      error: (response: unknown) => this.toastService.handleError(response),
      next: () => {
        this.router.navigate(['/cars/specifications-editor'], {
          queryParams: {
            item_id: item.id,
            tab: 'admin',
          },
        });
      },
    });
  }

  protected readonly ItemType = ItemType;
}
