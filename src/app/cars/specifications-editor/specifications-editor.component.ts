import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIItem, ItemService} from '@services/item';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEnvService} from '@services/page-env.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {APIService} from '@services/api.service';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-cars-specifications-editor',
  templateUrl: './specifications-editor.component.html',
})
export class CarsSpecificationsEditorComponent {
  private readonly change$ = new BehaviorSubject<null>(null);
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);
  protected readonly isSpecsAdmin$ = this.acl.isAllowed$(Resource.SPECIFICATIONS, Privilege.ADMIN);
  protected readonly tab$ = this.route.queryParamMap.pipe(map((params) => params.get('tab') || 'info'));
  protected readonly user$ = this.auth.getUser$();

  protected readonly data$: Observable<APIItem> = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('item_id'), 10)),
    distinctUntilChanged(),
    debounceTime(30),
    switchMap((itemID) =>
      this.change$.pipe(
        switchMap(() =>
          this.itemService.getItem$(itemID, {
            fields: 'name_html,name_text,engine_id,attr_zone_id',
          })
        )
      )
    ),
    tap((item) => {
      if (!item) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return;
      }
      this.pageEnv.set({
        title: $localize`Specs editor of ${item.name_text}`,
        pageId: 102,
      });
    })
  );

  constructor(
    private readonly api: APIService,
    private readonly itemService: ItemService,
    private readonly acl: ACLService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService,
    private readonly auth: AuthService
  ) {}

  protected onEngineChanged() {
    this.change$.next(null);
  }

  protected refreshInheritance(item: APIItem) {
    this.api.request<void>('POST', 'item/' + item.id + '/refresh-inheritance', {body: {}}).subscribe({
      next: () => {
        this.router.navigate(['/cars/specifications-editor'], {
          queryParams: {
            item_id: item.id,
            tab: 'admin',
          },
        });
      },
      error: (response: unknown) => this.toastService.handleError(response),
    });
  }
}
