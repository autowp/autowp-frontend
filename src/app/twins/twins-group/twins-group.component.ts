import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {APIItem, ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY, Observable, of} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {TwinsSidebarComponent} from '../sidebar.component';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TwinsSidebarComponent, AsyncPipe],
  selector: 'app-twins-group',
  standalone: true,
  templateUrl: './twins-group.component.html',
})
export class TwinsGroupComponent {
  private readonly itemService = inject(ItemService);
  private readonly route = inject(ActivatedRoute);
  private readonly pageEnv = inject(PageEnvService);
  private readonly router = inject(Router);

  protected readonly group$: Observable<APIItem> = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('group') || '', 10)),
    distinctUntilChanged(),
    switchMap((group) =>
      group
        ? this.itemService.getItem$(group, {
            fields: 'name_text,name_html,has_child_specs,accepted_pictures_count,childs.brands',
          })
        : EMPTY,
    ),
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return of(group);
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 25,
            title: group.name_text,
          }),
        0,
      );
    }),
    shareReplay(1),
  );

  protected readonly selectedBrands$ = this.group$.pipe(
    map((group) => {
      const result: string[] = [];
      for (const item of group.childs ? group.childs : []) {
        for (const brand of item.brands) {
          result.push(brand.catname);
        }
      }

      return result;
    }),
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();
}
