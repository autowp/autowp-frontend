import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { APIItem, ItemService } from '../../services/item';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  map
} from 'rxjs/operators';
import {APIGalleryItem} from '../../gallery/definitions';

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
  ) {}

  ngOnInit(): void {
    const groupPipe = this.route.paramMap.pipe(
      map(route => parseInt(route.get('group'), 10)),
      distinctUntilChanged(),
      switchMap(groupID => {
        if (!groupID) {
          return of(null as APIItem);
        }
        return this.itemService.getItem(groupID, {
          fields: 'name_text,name_html,childs.brands'
        });
      })
    );

    const identityPipe = this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged()
    );

    this.sub = groupPipe
      .pipe(
        switchMap(group => identityPipe.pipe(
          map(identity => ({
            group,
            identity
          }))
        ))
      )
      .subscribe((data) => {
        if (!data.group) {
          this.router.navigate(['/error-404'], {
            skipLocationChange: true
          });
          return;
        }

        this.group = data.group;
        this.current = data.identity;

        setTimeout(
          () =>
            this.pageEnv.set({
              layout: {
                needRight: false,
                isGalleryPage: true
              },
              nameTranslated: data.group.name_text,
              pageId: 28
            }),
          0
        );
      });
  }

  pictureSelected(item: APIGalleryItem) {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {
          needRight: false,
          isGalleryPage: true
        },
        nameTranslated: item.name,
        pageId: 28
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
