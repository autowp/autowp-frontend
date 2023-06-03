import {Component} from '@angular/core';
import {APIItem, ItemService} from '@services/item';
import {ActivatedRoute, Router} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {PageEnvService} from '@services/page-env.service';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ToastsService} from '../../toasts/toasts.service';
import {ItemType} from '@grpc/spec.pb';

@Component({
  selector: 'app-persons-person',
  templateUrl: './person.component.html',
})
export class PersonsPersonComponent {
  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged()
  );

  protected readonly item$: Observable<APIItem> = this.itemID$.pipe(
    switchMap((id) =>
      this.itemService.getItem$(id, {
        fields: ['name_text', 'name_html', 'description'].join(','),
      })
    ),
    catchError((err: unknown) => {
      this.toastService.handleError(err);
      this.router.navigate(['/error-404'], {
        skipLocationChange: true,
      });
      return EMPTY;
    }),
    switchMap((item) => {
      if (item.item_type_id !== ItemType.ITEM_TYPE_PERSON) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }

      return of(item);
    }),
    tap((item) => {
      this.pageEnv.set({
        title: item.name_text,
        pageId: 213,
      });
    }),
    shareReplay(1)
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private readonly itemService: ItemService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly acl: ACLService,
    private readonly pageEnv: PageEnvService,
    private readonly toastService: ToastsService
  ) {}
}
