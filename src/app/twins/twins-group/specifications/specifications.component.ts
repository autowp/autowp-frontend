import {Component} from '@angular/core';
import {ItemService, APIItem} from '@services/item';
import {EMPTY, Observable} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {APIService} from '@services/api.service';

@Component({
  selector: 'app-twins-group-specifications',
  templateUrl: './specifications.component.html',
})
export class TwinsGroupSpecificationsComponent {
  protected readonly id$ = this.route.parent.paramMap.pipe(
    map((params) => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    shareReplay(1)
  );

  protected readonly html$ = this.id$.pipe(
    switchMap((id) =>
      this.api.request('GET', 'item/' + id + '/child-specifications', {
        responseType: 'text',
      })
    )
  );

  protected readonly group$: Observable<APIItem> = this.id$.pipe(
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.itemService.getItem$(group, {
        fields: 'name_text,name_html',
      });
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            title: $localize`Specifications of ${group.name_text}`,
            pageId: 27,
          }),
        0
      );
    })
  );

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly api: APIService,
    private readonly router: Router
  ) {}
}
