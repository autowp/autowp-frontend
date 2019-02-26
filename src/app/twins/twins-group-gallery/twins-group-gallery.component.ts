import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { APIItem, ItemService } from '../../services/item';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-twins-group-gallery',
  templateUrl: './twins-group-gallery.component.html'
})
@Injectable()
export class TwinsGroupGalleryComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public group: APIItem;
  public itemID: number;
  public current: string;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.sub = this.route.paramMap
      .pipe(
        switchMap(
          (route) => {
            const groupID = parseInt(route.get('group'), 10);
            if (!groupID) {
              return of(null as APIItem);
            }
            return this.itemService.getItem(groupID, {
              fields: 'name_text,name_html,childs.brands.catname'
            });
          },
          (route, group) => ({
            group: group,
            route: route
          })
        )
      )
      .subscribe((data) => {

        if (!data.group) {
          this.router.navigate(['/error-404']);
          return;
        }

        this.group = data.group;

        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false,
                isGalleryPage: true
              },
              nameTranslated: '', // data.picture.name_text,
              pageId: 28
            }),
          0
        );

        const result = [];
        for (const item of data.group.childs) {
          for (const brand of item.brands) {
            result.push(brand.catname);
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
