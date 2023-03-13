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
  public isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private itemID$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id'), 10)),
    distinctUntilChanged()
  );

  public item$: Observable<APIItem> = this.itemID$.pipe(
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

  public layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private acl: ACLService,
    private pageEnv: PageEnvService,
    private toastService: ToastsService
  ) {}
}
