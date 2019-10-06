import { Injectable, OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { APIItem, ItemService } from '../../services/item';
import {APIPicture, PictureService} from '../../services/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEnvService } from '../../services/page-env.service';
import {
  switchMap,
  distinctUntilChanged,
  map,
  tap
} from 'rxjs/operators';
import { PathItem } from '../definitions';
import { CatagoriesService } from '../service';

@Component({
  selector: 'app-category-picture',
  templateUrl: './category-picture.component.html'
})
@Injectable()
export class CategoryPictureComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public category: APIItem;
  public current: APIItem;
  public picture: APIPicture;
  private pathCatnames: string[] = [];
  public path: PathItem[];

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private pageEnv: PageEnvService,
    private pictureService: PictureService,
    private router: Router,
    private categoriesService: CatagoriesService
  ) {}

  ngOnInit(): void {
    const identityPipe = this.route.paramMap.pipe(
      map(route => route.get('identity')),
      distinctUntilChanged()
    );

    this.sub = this.categoriesService
      .categoryPipe(this.route)
      .pipe(
        tap((data) => {
          this.current = data.current;
          this.category = data.category;
          this.path = data.pathItems;
          this.pathCatnames = data.pathCatnames;
        }),
        switchMap(data => identityPipe.pipe(
          map(identity => ({
            current: data.current,
            category: data.category,
            identity: identity
          }))
        )),
        switchMap(
          (data) => {
            if (!data.current || !data.identity) {
              return of({
                current: data.current,
                picture: null as APIPicture
              });
            }

            const fields =
              'owner,name_html,name_text,image,preview_large,add_date,dpi,point,paginator,' +
              'items.item.design,items.item.description,items.item.specs_url,items.item.has_specs,items.item.alt_names,' +
              'items.item.name_html,categories.catname,categories.name_html,copyrights,' +
              'twins.name_html,factories.name_html,moder_votes,votes,of_links,replaceable.url,replaceable.name_html';

            return this.pictureService.getPictures({
              identity: data.identity,
              status: 'accepted',
              item_id: data.current.id,
              fields: fields,
              limit: 1,
              items: {
                type_id: 1
              },
              paginator: {
                item_id: data.current.id
              }
            }).pipe(
              map(response => ({
                current: data.current,
                picture: response.pictures.length ? response.pictures[0] : null
              }))
            );
          }
        )
      )
      .subscribe((data) => {
        if (!data.picture || !data.current) {
          this.router.navigate(['/error-404']);
          return;
        }

        this.pageEnv.set({
          layout: {
            needRight: false
          },
          nameTranslated: data.picture.name_text,
          pageId: 187
        });

        this.picture = data.picture;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public dropdownOpenChange(item: PathItem) {
    if (!item.loaded) {
      this.itemService
        .getItems({
          fields: 'catname,name_html',
          parent_id: item.parent_id,
          no_parent: item.parent_id ? null : true,
          limit: 50,
          type_id: 3
        })
        .subscribe((response) => {
          item.loaded = true;
          item.childs = response.items;
        });
    }
  }

  public currentRouterLinkPrefix(): string[] {
    if (!this.category) {
      return null;
    }

    if (this.current.item_type_id === 3) {
      return ['/category', this.current.catname, 'pictures'];
    }

    return ['/category', this.category.catname]
      .concat(this.pathCatnames)
      .concat(['pictures']);
  }
}
