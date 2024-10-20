import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  APIItem,
  CreatePictureItemRequest,
  ItemFields,
  ItemListOptions,
  ItemParentCacheListOptions,
  ItemType,
  ListItemsRequest,
  Pages,
  PictureItemType,
  SetPictureItemItemIDRequest,
  SetPictureItemPerspectiveRequest,
} from '@grpc/spec.pb';
import {ItemsClient, PicturesClient} from '@grpc/spec.pbsc';
import {APIItemParentGetResponse, ItemParentService} from '@services/item-parent';
import {LanguageService} from '@services/language';
import {PageEnvService} from '@services/page-env.service';
import {combineLatest, EMPTY, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap} from 'rxjs/operators';

import {chunk} from '../../../../chunk';
import {PaginatorComponent} from '../../../../paginator/paginator/paginator.component';
import {ToastsService} from '../../../../toasts/toasts.service';
import {ModerPictureMoveItemComponent} from './item/item.component';

export interface PictureItemMoveSelection {
  itemId: string;
  perspectiveId: number;
  type: PictureItemType;
}

interface SrcSelection {
  id: number;
  srcItemID: number;
  srcType: PictureItemType;
}

interface SelectItemParams {
  selection: PictureItemMoveSelection;
  src: SrcSelection;
}

interface HtmlAndSelectItemParams {
  html: string;
  selection: SelectItemParams;
}

@Component({
  imports: [RouterLink, PaginatorComponent, FormsModule, ReactiveFormsModule, ModerPictureMoveItemComponent, AsyncPipe],
  selector: 'app-moder-pictures-item-move',
  standalone: true,
  templateUrl: './move.component.html',
})
export class ModerPicturesItemMoveComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly itemParentService = inject(ItemParentService);
  private readonly pageEnv = inject(PageEnvService);
  private readonly itemsClient = inject(ItemsClient);
  private readonly languageService = inject(LanguageService);
  private readonly picturesClient = inject(PicturesClient);
  private readonly toastService = inject(ToastsService);

  protected conceptsExpanded = false;

  private readonly srcItemID$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('src_item_id') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private readonly srcType$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('src_type') || '', 10) as PictureItemType),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly id$ = this.route.paramMap.pipe(
    map((params) => parseInt(params.get('id') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly src$ = combineLatest([this.id$, this.srcItemID$, this.srcType$]).pipe(
    map(([id, srcItemID, srcType]) => ({id, srcItemID, srcType}) as SrcSelection),
  );

  private isSrcTypeOrEmpty$(pictureItemType: PictureItemType) {
    return this.srcType$.pipe(
      map((srcType) => !srcType || srcType === pictureItemType),
      shareReplay(1),
    );
  }

  private readonly isContentTypeOrEmpty$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly showBrands$ = this.isContentTypeOrEmpty$;
  protected readonly showFactories$ = this.isContentTypeOrEmpty$;
  protected readonly showMuseums$ = this.isContentTypeOrEmpty$;
  protected readonly showPersons$ = this.isContentTypeOrEmpty$;
  protected readonly showAuthors$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_AUTHOR);
  protected readonly showCopyrights$ = this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_COPYRIGHTS);

  protected readonly showTabBar$ = combineLatest([
    this.showBrands$,
    this.showFactories$,
    this.showMuseums$,
    this.showPersons$,
    this.showAuthors$,
    this.showCopyrights$,
  ]).pipe(
    map(
      ([showBrands, showFactories, showMuseums, showPersons, showAuthors, showCopyrights]) =>
        showBrands && showFactories && showMuseums && showPersons && showAuthors && showCopyrights,
    ),
  );

  private tabActive$(param: string, pictureItemType: PictureItemType) {
    return combineLatest([
      this.isSrcTypeOrEmpty$(pictureItemType),
      this.srcItemID$,
      this.route.queryParamMap.pipe(
        map((params) => !!params.get(param)),
        distinctUntilChanged(),
      ),
    ]).pipe(
      map(([srcTypeIsContentOrEmpty, srcItemID, active]) => srcTypeIsContentOrEmpty && active && !srcItemID),
      shareReplay(1),
    );
  }

  protected readonly factoriesActive$ = this.tabActive$('show_factories', PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly museumsActive$ = this.tabActive$('show_museums', PictureItemType.PICTURE_ITEM_CONTENT);
  protected readonly personsActive$ = this.tabActive$('show_persons', PictureItemType.PICTURE_ITEM_CONTENT);

  protected readonly authorsActive$ = combineLatest([
    this.showAuthors$,
    this.src$,
    this.route.queryParamMap.pipe(
      map((params) => !!params.get('show_authors')),
      distinctUntilChanged(),
    ),
  ]).pipe(
    map(
      ([showAuthors, {srcItemID, srcType}, active]) =>
        showAuthors && !srcItemID && (active || srcType === PictureItemType.PICTURE_ITEM_AUTHOR),
    ),
    shareReplay(1),
  );

  protected readonly copyrightsActive$ = this.tabActive$('show_copyrights', PictureItemType.PICTURE_ITEM_COPYRIGHTS);

  protected readonly brandsActive$ = combineLatest([
    this.isSrcTypeOrEmpty$(PictureItemType.PICTURE_ITEM_CONTENT),
    this.factoriesActive$,
    this.museumsActive$,
    this.personsActive$,
    this.authorsActive$,
    this.copyrightsActive$,
  ]).pipe(
    map(
      ([srcTypeIsContentOrEmpty, showFactories, showMuseums, showPersons, showAuthors, showCopyrights]) =>
        srcTypeIsContentOrEmpty && !showFactories && !showMuseums && !showPersons && !showAuthors && !showCopyrights,
    ),
    shareReplay(1),
  );

  protected readonly searchBrandControl = new FormControl('');
  protected readonly searchPersonControl = new FormControl('');
  protected readonly searchAuthorControl = new FormControl('');

  private readonly page$ = this.route.queryParamMap.pipe(
    map((params) => parseInt(params.get('page') || '', 10)),
    distinctUntilChanged(),
    shareReplay(1),
  );

  protected readonly brandId$ = this.route.queryParamMap.pipe(
    map((params) => params.get('brand_id')),
    distinctUntilChanged(),
    shareReplay(1),
  );

  private getItems$(
    request: ListItemsRequest,
    selectionType: PictureItemType,
  ): Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> {
    return combineLatest([this.src$, this.itemsClient.list(new ListItemsRequest(request))]).pipe(
      map(([src, {items, paginator}]) => ({
        items: (items ? items : []).map((item) => ({
          html: item.nameHtml,
          selection: {
            selection: {
              itemId: item.id,
              perspectiveId: 0,
              type: selectionType,
            },
            src,
          },
        })),
        paginator,
      })),
    );
  }

  protected readonly museums$ = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          options: new ItemListOptions({
            typeId: ItemType.ITEM_TYPE_MUSEUM,
          }),
          page,
        }),
        PictureItemType.PICTURE_ITEM_CONTENT,
      ),
    ),
  );

  protected readonly factories$ = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          options: new ItemListOptions({
            typeId: ItemType.ITEM_TYPE_FACTORY,
          }),
          page,
        }),
        PictureItemType.PICTURE_ITEM_CONTENT,
      ),
    ),
  );

  private authorsAndPersons$(
    searchControl: FormControl<null | string>,
    selectionType: PictureItemType,
  ): Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> {
    return combineLatest([
      this.page$,
      searchControl.valueChanges.pipe(startWith(''), distinctUntilChanged(), debounceTime(30)),
    ]).pipe(
      switchMap(([page, search]) =>
        this.getItems$(
          new ListItemsRequest({
            fields: new ItemFields({nameHtml: true}),
            language: this.languageService.language,
            limit: 50,
            options: new ItemListOptions({
              name: search ? '%' + search + '%' : undefined,
              typeId: ItemType.ITEM_TYPE_PERSON,
            }),
            page,
          }),
          selectionType,
        ),
      ),
    );
  }

  protected readonly persons$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> =
    this.authorsAndPersons$(this.searchPersonControl, PictureItemType.PICTURE_ITEM_CONTENT);

  protected readonly authors$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> =
    this.authorsAndPersons$(this.searchAuthorControl, PictureItemType.PICTURE_ITEM_AUTHOR);

  protected readonly copyrights$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> = this.page$.pipe(
    switchMap((page) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 50,
          options: new ItemListOptions({
            typeId: ItemType.ITEM_TYPE_COPYRIGHT,
          }),
          page,
        }),
        PictureItemType.PICTURE_ITEM_COPYRIGHTS,
      ),
    ),
  );

  protected readonly vehicles$: Observable<APIItemParentGetResponse> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_VEHICLE,
        limit: 500,
        page: 1,
        parent_id: brandID ? +brandID : undefined,
      }),
    ),
  );

  protected readonly engines$: Observable<APIItemParentGetResponse> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.itemParentService.getItems$({
        fields: 'item.name_html,item.childs_count',
        item_type_id: ItemType.ITEM_TYPE_ENGINE,
        limit: 500,
        page: 1,
        parent_id: brandID ? +brandID : undefined,
      }),
    ),
  );

  protected readonly concepts$: Observable<{items: HtmlAndSelectItemParams[]; paginator?: Pages}> = this.brandId$.pipe(
    switchMap((brandID) =>
      this.getItems$(
        new ListItemsRequest({
          fields: new ItemFields({
            nameHtml: true,
          }),
          language: this.languageService.language,
          limit: 500,
          options: new ItemListOptions({
            ancestor: new ItemParentCacheListOptions({
              parentId: brandID ? brandID : undefined,
            }),
            isConcept: true,
            typeId: ItemType.ITEM_TYPE_VEHICLE,
          }),
          page: 1,
        }),
        PictureItemType.PICTURE_ITEM_COPYRIGHTS,
      ),
    ),
  );

  protected readonly brands$: Observable<{items: APIItem[][]; paginator?: Pages}> = combineLatest([
    this.page$,
    this.searchBrandControl.valueChanges.pipe(startWith(''), distinctUntilChanged(), debounceTime(30)),
  ]).pipe(
    switchMap(([page, search]) =>
      this.itemsClient.list(
        new ListItemsRequest({
          fields: new ItemFields({nameHtml: true}),
          language: this.languageService.language,
          limit: 200,
          options: new ItemListOptions({
            name: search ? '%' + search + '%' : undefined,
            typeId: ItemType.ITEM_TYPE_BRAND,
          }),
          page,
        }),
      ),
    ),
    map((response) => ({
      items: chunk<APIItem>(response.items ? response.items : [], 6),
      paginator: response.paginator,
    })),
  );

  protected readonly PictureItemType = PictureItemType;

  ngOnInit(): void {
    setTimeout(() => {
      this.pageEnv.set({
        layout: {isAdminPage: true},
        pageId: 149,
      });
    }, 0);
  }

  protected selectItem({selection, src: {id, srcItemID, srcType}}: SelectItemParams) {
    const dstItemID = selection.itemId;
    const dstPerspectiveID = selection.perspectiveId;

    if (srcItemID && srcType) {
      this.picturesClient
        .setPictureItemItemID(
          new SetPictureItemItemIDRequest({
            itemId: '' + srcItemID,
            newItemId: dstItemID,
            pictureId: '' + id,
            type: srcType,
          }),
        )
        .pipe(
          switchMap(() => {
            if (!dstPerspectiveID) {
              return of(null);
            }

            return this.picturesClient.setPictureItemPerspective(
              new SetPictureItemPerspectiveRequest({
                itemId: dstItemID,
                perspectiveId: dstPerspectiveID || undefined,
                pictureId: '' + id,
                type: srcType,
              }),
            );
          }),
          catchError((error: unknown) => {
            this.toastService.handleError(error);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          if (localStorage) {
            localStorage.setItem('last_item', dstItemID);
          }
          this.router.navigate(['/moder/pictures', id]);
        });
    } else {
      this.picturesClient
        .createPictureItem(
          new CreatePictureItemRequest({
            itemId: dstItemID,
            perspectiveId: dstPerspectiveID || undefined,
            pictureId: '' + id,
            type: selection.type,
          }),
        )
        .pipe(
          catchError((error: unknown) => {
            this.toastService.handleError(error);
            return EMPTY;
          }),
        )
        .subscribe(() => {
          if (localStorage) {
            localStorage.setItem('last_item', dstItemID);
          }
          this.router.navigate(['/moder/pictures', id]);
        });
    }

    return false;
  }

  protected toggleConcepts() {
    this.conceptsExpanded = !this.conceptsExpanded;
    return false;
  }
}
