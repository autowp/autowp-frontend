import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIItem } from '../../services/item';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import { distinctUntilChanged, map, switchMapTo, tap } from 'rxjs/operators';
import { CatagoriesService } from '../service';

@Component({
  selector: 'app-category-gallery',
  templateUrl: './category-gallery.component.html'
})
@Injectable()
export class CategoryGalleryComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private category: APIItem;
  public itemID: number;
  public current: string;

  public currentItem: APIItem;
  private pathCatnames: string[];

  constructor(
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private router: Router,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    const identityPipe = this.route.paramMap.pipe(
      map((route) => route.get('identity')),
      distinctUntilChanged()
    );

    this.sub = this.categoriesService
      .categoryPipe(this.route)
      .pipe(
        tap((data) => {
          this.currentItem = data.current;
          this.category = data.category;
          this.pathCatnames = data.pathCatnames;
        }),
        switchMapTo(identityPipe, (data, identity) => ({
          current: data.current,
          category: data.category,
          identity: identity
        }))
      )
      .subscribe((data) => {
        if (!data.identity || !data.current) {
          this.router.navigate(['/error-404']);
          return;
        }

        this.pageEnv.set({
          layout: {
            needRight: false,
            isGalleryPage: true
          },
          nameTranslated: '', // data.picture.name_text,
          pageId: 187
        });

        this.current = data.identity;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public currentRouterLinkPrefix(): string[] {
    if (!this.category) {
      return null;
    }

    if (this.currentItem.item_type_id === 3) {
      return ['/category', this.currentItem.catname];
    }

    return ['/category', this.category.catname]
      .concat(this.pathCatnames);
  }
}
