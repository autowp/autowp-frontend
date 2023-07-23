import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '@services/item';
import {PageEnvService} from '@services/page-env.service';
import {EMPTY} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-twins-group',
  templateUrl: './twins-group.component.html',
})
export class TwinsGroupComponent {
  protected readonly group$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('group'), 10)),
    distinctUntilChanged(),
    switchMap((group) => {
      if (!group) {
        this.router.navigate(['/error-404'], {
          skipLocationChange: true,
        });
        return EMPTY;
      }
      return this.itemService.getItem$(group, {
        fields: 'name_text,name_html,has_child_specs,accepted_pictures_count,childs.brands',
      });
    }),
    tap((group) => {
      setTimeout(
        () =>
          this.pageEnv.set({
            pageId: 25,
            title: group.name_text,
          }),
        0
      );
    }),
    shareReplay(1)
  );

  protected readonly selectedBrands$ = this.group$.pipe(
    map((group) => {
      const result = [];
      for (const item of group.childs) {
        for (const brand of item.brands) {
          result.push(brand.catname);
        }
      }

      return result;
    })
  );

  protected readonly layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private readonly itemService: ItemService,
    private readonly route: ActivatedRoute,
    private readonly pageEnv: PageEnvService,
    private readonly router: Router
  ) {}
}
