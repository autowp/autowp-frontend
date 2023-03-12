import {Component} from '@angular/core';
import {ItemService} from '@services/item';
import {EMPTY} from 'rxjs';
import {PageEnvService} from '@services/page-env.service';
import {distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-twins-group',
  templateUrl: './twins-group.component.html',
})
export class TwinsGroupComponent {
  public group$ = this.route.paramMap.pipe(
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
            title: group.name_text,
            pageId: 25,
          }),
        0
      );
    }),
    shareReplay(1)
  );

  public selectedBrands$ = this.group$.pipe(
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

  public layoutParams$ = this.pageEnv.layoutParams$.asObservable();

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router
  ) {}
}
