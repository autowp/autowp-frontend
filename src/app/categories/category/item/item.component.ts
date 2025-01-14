import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {GetPicturesRequest, ItemType, Picture, PictureFields, PictureItemOptions, PicturesOptions} from '@grpc/spec.pb';
import {PicturesClient} from '@grpc/spec.pbsc';
import {ACLService, Privilege, Resource} from '@services/acl.service';
import {APIItem, ItemService} from '@services/item';
import {ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {MarkdownComponent} from '@utils/markdown/markdown.component';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap} from 'rxjs/operators';

import {PaginatorComponent} from '../../../paginator/paginator/paginator.component';
import {ToastsService} from '../../../toasts/toasts.service';
import {CategoriesListItemComponent} from '../../list-item.component';
import {CategoriesService} from '../../service';

interface PictureRoute {
  picture: Picture;
  route: string[];
}

@Component({
  imports: [MarkdownComponent, CategoriesListItemComponent, RouterLink, PaginatorComponent, AsyncPipe],
  selector: 'app-categories-category-item',
  templateUrl: './item.component.html',
})
export class CategoriesCategoryItemComponent {
  private readonly itemService = inject(ItemService);
  private readonly itemParentService = inject(ItemParentService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly route = inject(ActivatedRoute);
  private readonly acl = inject(ACLService);
  private readonly categoriesService = inject(CategoriesService);
  readonly #picturesClient = inject(PicturesClient);
  readonly #languageService = inject(LanguageService);
  readonly #toastService = inject(ToastsService);

  protected readonly isModer$ = this.acl.isAllowed$(Resource.GLOBAL, Privilege.MODERATE);

  private readonly categoryData$ = this.categoriesService.categoryPipe$(this.route.parent!).pipe(
    tap(({current}) => {
      this.pageEnv.set({
        pageId: 22,
        title: current.name_text,
      });
    }),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  private readonly page$ = this.route.queryParamMap.pipe(
    map((query) => parseInt(query.get('page') ?? '', 10)),
    distinctUntilChanged(),
    debounceTime(10),
  );

  protected readonly itemParents$ = combineLatest([this.categoryData$, this.page$]).pipe(
    switchMap(([{category, current, pathCatnames}, page]) =>
      this.itemParentService
        .getItems$({
          fields: [
            'item.name_html,item.name_default,item.description,item.has_text,item.produced,item.accepted_pictures_count',
            'item.design,item.engine_vehicles',
            'item.can_edit_specs,item.specs_route',
            'item.twins_groups',
            'item.childs_count,item.total_pictures,item.preview_pictures.picture.name_text',
          ].join(','),
          limit: 10,
          order: 'categories_first',
          page,
          parent_id: current.id,
        })
        .pipe(
          map((response) => ({
            items: response.items.map((itemParent) => ({
              item: itemParent,
              parentRouterLink: [
                '/category',
                ...(itemParent.item.item_type_id === ItemType.ITEM_TYPE_CATEGORY
                  ? [itemParent.item.catname]
                  : // eslint-disable-next-line sonarjs/no-nested-conditional
                    category
                    ? [category.catname, ...pathCatnames, itemParent.catname]
                    : []),
              ],
            })),
            paginator: response.paginator,
          })),
        ),
    ),
    shareReplay({bufferSize: 1, refCount: false}),
  );

  protected readonly pictures$: Observable<PictureRoute[]> = combineLatest([
    this.categoryData$,
    this.itemParents$,
  ]).pipe(
    switchMap(([{category, current, pathCatnames}, itemParents]) => {
      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY || itemParents.items.length <= 0) {
        return of([]);
      }

      return this.#picturesClient
        .getPictures(
          new GetPicturesRequest({
            fields: new PictureFields({nameText: true, thumbMedium: true}),
            language: this.#languageService.language,
            limit: 4,
            options: new PicturesOptions({
              pictureItem: new PictureItemOptions({
                itemId: '' + current.id,
              }),
            }),
          }),
        )
        .pipe(
          catchError((err: unknown) => {
            this.#toastService.handleError(err);
            return EMPTY;
          }),
          map((response) =>
            (response.items || []).map((picture) => ({
              picture,
              route: [
                '/category',
                category ? category.catname : '',
                ...(current.item_type_id === ItemType.ITEM_TYPE_CATEGORY ? [] : pathCatnames),
                'pictures',
                picture.identity,
              ],
            })),
          ),
        );
    }),
  );

  protected readonly currentRouterLinkPrefix$ = this.categoryData$.pipe(
    map(({category, current, pathCatnames}) => {
      if (!category) {
        return null;
      }

      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY) {
        return ['/category', current.catname];
      }

      return ['/category', category.catname, ...pathCatnames];
    }),
  );

  protected readonly item$: Observable<APIItem | null> = combineLatest([this.categoryData$, this.itemParents$]).pipe(
    switchMap(([{current}, itemParents]) => {
      if (current.item_type_id === ItemType.ITEM_TYPE_CATEGORY || itemParents.items.length > 0) {
        return of(null);
      }

      return this.itemService.getItem$(current.id, {
        fields: [
          'catname,name_html,name_default,description,has_text,produced,accepted_pictures_count',
          'design,engine_vehicles',
          'can_edit_specs,specs_route',
          'twins_groups',
          'childs_count,total_pictures,preview_pictures.picture.name_text',
        ].join(','),
      });
    }),
  );

  protected readonly current$: Observable<APIItem> = this.categoryData$.pipe(
    map(({current}) => current),
    shareReplay({bufferSize: 1, refCount: false}),
  );
}
